import React from 'react';
import { createClient } from '@/lib/supabase/server';
import CatalogueClient from './CatalogueClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Catalogue · RE·DESIGN',
  description:
    "Unique pieces of authored Italian lighting, 1960–2000. Stilnovo, Arteluce, Flos, O‑Luce and others.",
};

export const revalidate = 60;

export default async function CataloguePage() {
  const supabase = await createClient();

  const { data: products } = await supabase
    .from('products')
    .select(
      'id, lot, type, title, maison, maison_name, city, year, designer, attribution, price, shade_tone, status'
    )
    .in('status', ['available', 'reserved', 'sold'])
    .order('year', { ascending: false });

  const productIds = (products ?? []).map((p) => p.id);
  const { data: primaryImages } = productIds.length
    ? await supabase
        .from('product_images')
        .select('product_id, url')
        .eq('is_primary', true)
        .in('product_id', productIds)
    : { data: [] };

  const imageMap: Record<string, string> = {};
  for (const img of primaryImages ?? []) {
    imageMap[img.product_id] = img.url;
  }

  return <CatalogueClient products={products ?? []} imageMap={imageMap} />;
}
