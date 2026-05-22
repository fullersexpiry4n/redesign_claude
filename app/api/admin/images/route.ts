import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';
import { createClient as createAuthClient } from '@/lib/supabase/server';

export async function DELETE(req: NextRequest) {
  const supabaseAuth = await createAuthClient();
  const { data: { user } } = await supabaseAuth.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { imageId } = await req.json();
  if (!imageId) return NextResponse.json({ error: 'Missing imageId' }, { status: 400 });

  const supabase = createServiceClient();

  const { data: image } = await supabase
    .from('product_images')
    .select('storage_path')
    .eq('id', imageId)
    .single();

  if (image?.storage_path) {
    await supabase.storage.from('product-images').remove([image.storage_path]);
  }

  const { error } = await supabase.from('product_images').delete().eq('id', imageId);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
