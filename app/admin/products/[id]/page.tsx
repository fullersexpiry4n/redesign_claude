import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import ProductForm from '../ProductForm';
import type { Metadata } from 'next';

type Props = { params: Promise<{ id: string }> };

export const metadata: Metadata = {
  title: 'Edit piece · Admin · RE·DESIGN',
  robots: { index: false },
};

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (!product) notFound();

  const { data: images } = await supabase
    .from('product_images')
    .select('*')
    .eq('product_id', id)
    .order('sort_order');

  return (
    <div style={{ padding: '48px var(--page-px) 96px', maxWidth: 960 }}>
      <Link
        href="/admin"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: '0.14em',
          color: 'var(--fg-muted)',
          textDecoration: 'none',
          display: 'inline-block',
          marginBottom: 32,
        }}
      >
        ← Dashboard
      </Link>

      <h1
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 32,
          fontWeight: 400,
          fontStyle: 'italic',
          margin: '0 0 8px',
        }}
      >
        {product.title}
      </h1>

      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          textTransform: 'uppercase',
          letterSpacing: '0.16em',
          opacity: 0.5,
          marginBottom: 8,
        }}
      >
        LOT {product.lot}
      </div>

      <hr
        style={{
          border: 0,
          height: 1,
          background: 'var(--ottone-brunito)',
          margin: '20px 0 36px',
          width: 48,
        }}
      />

      <ProductForm product={product} images={images ?? []} />
    </div>
  );
}
