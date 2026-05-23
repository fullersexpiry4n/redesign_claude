import { NextRequest, NextResponse, after } from 'next/server';
import sharp from 'sharp';
import { createServiceClient } from '@/lib/supabase/server';
import { createClient as createAuthClient } from '@/lib/supabase/server';

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  // Verify admin session
  const supabaseAuth = await createAuthClient();
  const { data: { user } } = await supabaseAuth.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get('file') as File | null;
  const productId = formData.get('productId') as string | null;
  const sortOrder = parseInt((formData.get('sortOrder') as string) ?? '0', 10);
  const isPrimary = formData.get('isPrimary') === 'true';

  if (!file || !productId) {
    return NextResponse.json({ error: 'Missing file or productId' }, { status: 400 });
  }

  // Resize + WebP conversion on upload — turns a 1.7MB PNG into ~200KB WebP
  const inputBuffer = Buffer.from(await file.arrayBuffer());
  let optimized: Buffer;
  try {
    optimized = await sharp(inputBuffer)
      .rotate() // honor EXIF orientation
      .resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 82 })
      .toBuffer();
  } catch (err) {
    console.error('Image processing error:', err);
    return NextResponse.json({ error: 'Image processing failed' }, { status: 400 });
  }

  const storagePath = `products/${productId}/${Date.now()}.webp`;

  const supabase = createServiceClient();

  const { error: uploadError } = await supabase.storage
    .from('product-images')
    .upload(storagePath, optimized, {
      contentType: 'image/webp',
      upsert: false,
      cacheControl: '31536000', // 1 year — content-addressed by timestamp
    });

  if (uploadError) {
    console.error('Upload error:', uploadError);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }

  const { data: urlData } = supabase.storage
    .from('product-images')
    .getPublicUrl(storagePath);

  const { data: imageRecord, error: dbError } = await supabase
    .from('product_images')
    .insert({
      product_id: productId,
      url: urlData.publicUrl,
      storage_path: storagePath,
      sort_order: sortOrder,
      is_primary: isPrimary,
    })
    .select()
    .single();

  if (dbError) {
    console.error('DB insert error:', dbError);
    return NextResponse.json({ error: 'Failed to save image record' }, { status: 500 });
  }

  // Warm Supabase's CDN so the first visitor reads the file from edge, not cold storage.
  // after() keeps the serverless function alive until this completes.
  after(async () => {
    await fetch(urlData.publicUrl).catch(() => {});
  });

  return NextResponse.json({ image: imageRecord });
}
