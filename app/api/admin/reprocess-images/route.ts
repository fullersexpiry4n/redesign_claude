import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';
import { createServiceClient } from '@/lib/supabase/server';
import { createClient as createAuthClient } from '@/lib/supabase/server';

export const maxDuration = 300;

const BATCH_LIMIT = 10;

export async function POST(req: NextRequest) {
  // Admin auth
  const supabaseAuth = await createAuthClient();
  const { data: { user } } = await supabaseAuth.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createServiceClient();

  // Pull a batch of legacy (non-webp) images
  const { data: images, error: queryError } = await supabase
    .from('product_images')
    .select('id, storage_path')
    .not('storage_path', 'ilike', '%.webp')
    .order('created_at', { ascending: true })
    .limit(BATCH_LIMIT);

  if (queryError) {
    return NextResponse.json({ error: queryError.message }, { status: 500 });
  }

  if (!images || images.length === 0) {
    return NextResponse.json({ processed: 0, remaining: 0, errors: [], done: true });
  }

  const errors: { id: string; message: string }[] = [];
  let processed = 0;

  for (const img of images) {
    try {
      // Download original
      const { data: fileData, error: dlError } = await supabase.storage
        .from('product-images')
        .download(img.storage_path);
      if (dlError || !fileData) {
        throw new Error(`download: ${dlError?.message ?? 'no data'}`);
      }

      const inputBuffer = Buffer.from(await fileData.arrayBuffer());

      // Resize + WebP
      const optimized = await sharp(inputBuffer)
        .rotate()
        .resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 82 })
        .toBuffer();

      // Upload to a new .webp path (keep old path intact until DB updated)
      const dir = img.storage_path.substring(0, img.storage_path.lastIndexOf('/'));
      const newPath = `${dir}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.webp`;

      const { error: upError } = await supabase.storage
        .from('product-images')
        .upload(newPath, optimized, {
          contentType: 'image/webp',
          upsert: false,
          cacheControl: '31536000',
        });
      if (upError) throw new Error(`upload: ${upError.message}`);

      const { data: urlData } = supabase.storage
        .from('product-images')
        .getPublicUrl(newPath);

      // Swap DB record
      const { error: dbError } = await supabase
        .from('product_images')
        .update({ url: urlData.publicUrl, storage_path: newPath })
        .eq('id', img.id);
      if (dbError) throw new Error(`db: ${dbError.message}`);

      // Delete old file (best-effort)
      await supabase.storage.from('product-images').remove([img.storage_path]).catch(() => {});

      // Warm Supabase CDN (best-effort)
      fetch(urlData.publicUrl).catch(() => {});

      processed++;
    } catch (err) {
      errors.push({
        id: img.id,
        message: err instanceof Error ? err.message : String(err),
      });
    }
  }

  // Count remaining
  const { count } = await supabase
    .from('product_images')
    .select('*', { count: 'exact', head: true })
    .not('storage_path', 'ilike', '%.webp');

  return NextResponse.json({
    processed,
    remaining: count ?? 0,
    errors,
    done: (count ?? 0) === 0,
  });
}
