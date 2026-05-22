'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import type { ProvenanceStop } from '@/data/pieces';
import LotMark from './atoms/LotMark';
import MonoCaps from './atoms/MonoCaps';
import ProvenanceChain from './atoms/ProvenanceChain';
import AddToCartButton from './AddToCartButton';
import type { CartItem } from '@/types/database';

type Props = {
  lot: string;
  type: string;
  title: string;
  maison: string;
  maison_name: string;
  city: string;
  year: number;
  designer: string;
  attribution: string;
  price: number;
  status: string;
  meta: Record<string, string>;
  desc: string;
  prov: ProvenanceStop[];
  cartItem: CartItem;
};

export default function ProductDetailClient({
  lot, type, title, maison, city, year, designer, attribution,
  price, status, meta, desc, prov, cartItem,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    const items = el.querySelectorAll('[data-fade]');
    gsap.set(items, { opacity: 0, y: 16 });
    gsap.to(items, { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'power2.out', delay: 0.1 });
  }, [lot]);

  return (
    <div ref={ref}>

      {/* Type + lot */}
      <div data-fade>
        <LotMark n={lot} label={type} level="med" />
      </div>

      {/* Title */}
      <h1
        data-fade
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(28px, 3vw, 40px)',
          fontWeight: 400,
          lineHeight: 1.1,
          letterSpacing: '0.01em',
          margin: '14px 0 6px',
          fontStyle: 'italic',
        }}
      >
        {title}
      </h1>

      {/* Maison + location */}
      <div
        data-fade
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
        }}
      >
        {maison} · {city.toUpperCase()}
      </div>
      <div
        data-fade
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          letterSpacing: '0.14em',
          opacity: 0.6,
          marginTop: 4,
        }}
      >
        {attribution} {designer} · c. {year}
      </div>

      <hr
        data-fade
        style={{ border: 0, height: 1, background: 'var(--ottone-brunito)', width: 48, margin: '24px 0' }}
      />

      {/* Price */}
      <div
        data-fade
        style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 6 }}
      >
        <div
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 32,
            whiteSpace: 'nowrap',
            letterSpacing: '-0.01em',
          }}
        >
          € {price.toLocaleString('it-IT')}
        </div>
        <MonoCaps size={10} opacity={0.5} style={{ whiteSpace: 'nowrap' }}>
          + spedizione su richiesta
        </MonoCaps>
      </div>

      {/* Cart + enquire */}
      <div data-fade style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 36, alignItems: 'center' }}>
        <AddToCartButton item={cartItem} status={status as any} />
        <a
          href="/contact"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            color: 'var(--ottone-brunito)',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            borderBottom: '1px solid currentColor',
            paddingBottom: 1,
          }}
        >
          Richiesta informazioni
        </a>
      </div>

      <hr
        data-fade
        style={{ border: 0, height: 1, background: 'rgba(20,20,20,0.1)', margin: '0 0 28px' }}
      />

      {/* Description */}
      <p
        data-fade
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 14,
          lineHeight: 1.75,
          maxWidth: '54ch',
          margin: '0 0 32px',
          opacity: 0.85,
        }}
      >
        {desc}
      </p>

      {/* Meta / specs */}
      <div
        data-fade
        style={{
          borderTop: '1px solid rgba(20,20,20,0.1)',
          marginBottom: 32,
        }}
      >
        {Object.entries(meta).map(([k, v]) => (
          <div
            key={k}
            style={{
              display: 'grid',
              gridTemplateColumns: '130px 1fr',
              gap: 16,
              padding: '11px 0',
              borderBottom: '1px solid rgba(20,20,20,0.07)',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                textTransform: 'uppercase',
                letterSpacing: '0.16em',
                opacity: 0.5,
                paddingTop: 2,
              }}
            >
              {k}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                letterSpacing: '0.04em',
              }}
            >
              {v}
            </div>
          </div>
        ))}
      </div>

      {/* Provenance */}
      <div data-fade>
        <MonoCaps size={10} opacity={0.5}>PROVENANCE</MonoCaps>
        <div style={{ marginTop: 14 }}>
          <ProvenanceChain stops={prov} />
        </div>
      </div>
    </div>
  );
}
