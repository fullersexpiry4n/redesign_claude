import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import ProductGallery from '@/components/ProductGallery';
import ProductDetailClient from '@/components/ProductDetailClient';
import type { CartItem } from '@/types/database';

type Props = { params: Promise<{ lot: string }> };

export const revalidate = 60;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lot } = await params;
  const supabase = await createClient();
  const { data: p } = await supabase
    .from('products')
    .select('title, maison_name, description')
    .eq('lot', lot)
    .single();

  if (!p) return { title: 'RE·DESIGN' };

  return {
    title: `${p.title} · ${p.maison_name} · RE·DESIGN`,
    description: p.description ?? `${p.maison_name} — ${p.title}. Illuminazione italiana d'autore.`,
  };
}

export default async function ProductPage({ params }: Props) {
  const { lot } = await params;
  const supabase = await createClient();

  const { data: p } = await supabase
    .from('products')
    .select(
      'id, lot, type, title, maison, maison_name, city, year, designer, attribution, price, description, meta, provenance, shade_tone, status'
    )
    .eq('lot', lot)
    .single();

  if (!p) notFound();

  const { data: images } = await supabase
    .from('product_images')
    .select('id, url, sort_order, is_primary')
    .eq('product_id', p.id)
    .order('sort_order');

  const sortedImages = images ?? [];

  const meta: Record<string, string> = p.meta ?? {
    Period: String(p.year),
    Materials: '—',
    Dimensions: '—',
    Wiring: 'replaced, CE compliant',
    Condition: 'excellent',
  };

  const desc =
    p.description ??
    `Piece by ${p.maison_name}, ${p.city}. Documented and restored. CE compliant wiring.`;

  const prov = p.provenance ?? [
    { label: `${p.city}, c. ${p.year}` },
    { label: 'Private collection', unknown: true },
    { label: 'Returned, 2026' },
  ];

  const cartItem: CartItem = {
    productId: p.id,
    lot: p.lot,
    title: p.title,
    maison_name: p.maison_name,
    price: p.price,
    shadeTone: p.shade_tone ?? 'warm',
  };

  return (
    <div style={{ padding: '16px var(--page-px) 96px' }}>
      {/* Back */}
      <Link
        href="/catalogue"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: '0.16em',
          opacity: 0.6,
          display: 'inline-block',
          marginBottom: 20,
          color: 'var(--inchiostro)',
        }}
      >
        ← Catalogue
      </Link>

      <div className="grid-product">
        {/* Gallery */}
        <ProductGallery
          images={sortedImages}
          title={p.title}
          shadeTone={p.shade_tone ?? 'warm'}
        />

        {/* Detail */}
        <ProductDetailClient
          lot={p.lot}
          type={p.type}
          title={p.title}
          maison={p.maison}
          maison_name={p.maison_name}
          city={p.city}
          year={p.year}
          designer={p.designer ?? '—'}
          attribution={p.attribution ?? 'Manufacturer'}
          price={p.price}
          status={p.status}
          meta={meta}
          desc={desc}
          prov={prov}
          cartItem={cartItem}
        />
      </div>
    </div>
  );
}
