import React from 'react';
import Link from 'next/link';
import { MAISONS } from '@/data/pieces';
import ProductCard from '@/components/ProductCard';
import MonoCaps from '@/components/atoms/MonoCaps';
import HeroSection from '@/components/HeroSection';
import RevealOnScroll from '@/components/gsap/RevealOnScroll';
import DrawRule from '@/components/gsap/DrawRule';
import { createClient } from '@/lib/supabase/server';

export const revalidate = 60;

export default async function HomePage() {
  const supabase = await createClient();

  const { data: products } = await supabase
    .from('products')
    .select('id, lot, type, title, maison, year, price, shade_tone, status')
    .eq('status', 'available')
    .order('created_at', { ascending: false })
    .limit(3);

  const featured = products ?? [];

  const productIds = featured.map((p) => p.id);
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

  return (
    <>
      <HeroSection />

      {/* Ritorni — latest pieces */}
      <section style={{ padding: '80px var(--page-px)' }}>
        <RevealOnScroll>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginBottom: 40,
              flexWrap: 'wrap',
              gap: 12,
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 400,
                fontSize: 'clamp(28px, 4vw, 40px)',
                letterSpacing: '0.02em',
                margin: 0,
              }}
            >
              <em>Ritorni</em> — latest pieces
            </h2>
            <Link
              href="/catalogue"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: '0.18em',
                color: 'var(--ottone-brunito)',
                borderBottom: '1px solid var(--ottone-brunito)',
                paddingBottom: 2,
              }}
            >
              VIEW ALL →
            </Link>
          </div>
        </RevealOnScroll>

        {/* Responsive 3-col grid */}
        <RevealOnScroll stagger={0.1} className="grid-3">
          {featured.map((p) => (
            <ProductCard
              key={p.lot}
              piece={{ ...p, shadeTone: p.shade_tone ?? 'warm', maisonName: p.maison, designer: '', attribution: '', desc: null, meta: null, provenance: null } as any}
              imageUrl={imageMap[p.id]}
            />
          ))}
        </RevealOnScroll>
      </section>

      <div style={{ padding: '0 var(--page-px)' }}>
        <DrawRule width={80} />
      </div>

      {/* Manifesto */}
      <section style={{ padding: '80px var(--page-px)' }} className="grid-manifesto">
        <RevealOnScroll>
          <MonoCaps size={11} opacity={0.6} as="div">§ Manifesto</MonoCaps>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 400,
              fontSize: 36,
              letterSpacing: '0.01em',
              lineHeight: 1.15,
              margin: '14px 0 0',
              maxWidth: '16ch',
            }}
          >
            Documented, restored, returned to circulation.
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 15,
              lineHeight: 1.75,
              maxWidth: '58ch',
            }}
          >
            <p>
              Each piece is examined in person before it enters the catalogue. We document
              the maker, the period of production, and the chain of ownership where it can
              be established. Where it cannot, we say so plainly — honesty over inflation.
            </p>
            <p>
              Wiring is brought to current Italian standards before a piece leaves the
              workshop. Original labels are preserved; replaced parts are noted.{' '}
              <em style={{ fontFamily: 'var(--font-serif)' }}>The lamp leaves us doing its job.</em>
            </p>

            <div
              style={{
                marginTop: 28,
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 24,
              }}
            >
              {[
                ['§01', 'Documented', 'Maker, period, provenance.'],
                ['§02', 'Restored', 'CE-compliant rewiring; original labels preserved.'],
                ['§03', 'Returned', 'To a next chapter, not a showroom shelf.'],
              ].map(([n, h, b]) => (
                <div key={n}>
                  <MonoCaps size={10} opacity={0.6} style={{ color: 'var(--ottone-brunito)' }} as="div">
                    {n}
                  </MonoCaps>
                  <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 18, marginTop: 8 }}>
                    {h}
                  </div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: 13, lineHeight: 1.55, marginTop: 6, opacity: 0.85 }}>
                    {b}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </section>

      <div style={{ padding: '0 var(--page-px)' }}>
        <DrawRule width={80} />
      </div>

      {/* Maisons */}
      <section style={{ padding: '72px var(--page-px) 96px' }}>
        <RevealOnScroll>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginBottom: 32,
              flexWrap: 'wrap',
              gap: 8,
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 400,
                fontSize: 'clamp(26px, 3vw, 36px)',
                letterSpacing: '0.01em',
                margin: 0,
              }}
            >
              <em>Maisons</em> represented
            </h2>
            <MonoCaps size={11} opacity={0.6}>
              {MAISONS.length} maisons · 1932 — present
            </MonoCaps>
          </div>
        </RevealOnScroll>

        <RevealOnScroll stagger={0.05} className="grid-maisons">
          {MAISONS.map((m) => (
            <Link
              key={m.name}
              href="/maisons"
              style={{
                paddingBottom: 14,
                textDecoration: 'none',
                color: 'inherit',
                borderBottom: '1px solid rgba(20,20,20,0.1)',
                display: 'block',
              }}
            >
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 22, letterSpacing: '0.01em' }}>
                {m.name}
              </div>
            </Link>
          ))}
        </RevealOnScroll>
      </section>
    </>
  );
}
