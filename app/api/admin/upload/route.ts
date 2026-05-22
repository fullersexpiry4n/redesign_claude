import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';
import { createClient as createAuthClient } from '@/lib/supabase/server';

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

  const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg';
  const storagePath = `products/${productId}/${Date.now()}.${ext}`;

  const supabase = createServiceClient();

  const { error: uploadError } = await supabase.storage
    .from('product-images')
    .upload(storagePath, file, {
      contentType: file.type,
      upsert: false,
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

  return NextResponse.json({ image: imageRecord });
}
