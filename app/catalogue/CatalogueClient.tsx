'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import LampSilhouette from '@/components/LampSilhouette';
import LotMark from '@/components/atoms/LotMark';
import MonoCaps from '@/components/atoms/MonoCaps';
import DrawRule from '@/components/gsap/DrawRule';
import RevealOnScroll from '@/components/gsap/RevealOnScroll';
import type { Product } from '@/types/database';

type ProductSummary = Pick<
  Product,
  'id' | 'lot' | 'type' | 'title' | 'maison' | 'maison_name' | 'city' | 'year' | 'price' | 'shade_tone' | 'status'
>;

type Props = { products: ProductSummary[]; imageMap?: Record<string, string> };

const DECADES = ['All', '1960s', '1970s', '1980s', '1990s'];

function inDecade(year: number, d: string) {
  if (d === 'All') return true;
  const base = parseInt(d);
  return year >= base && year < base + 10;
}

function ProductCard({ p, imageUrl }: { p: ProductSummary; imageUrl?: string }) {
  const sold = p.status === 'sold';
  const reserved = p.status === 'reserved';

  return (
    <Link
      href={`/catalogue/${p.lot}`}
      style={{
        textDecoration: 'none',
        color: 'inherit',
        border: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        opacity: sold ? 0.5 : 1,
        transition: 'opacity 120ms ease',
      }}
    >
      {/* Photo area */}
      <div
        style={{
          width: '100%',
          aspectRatio: '1 / 1',
          background: 'var(--carta)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={p.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
            unoptimized
          />
        ) : (
          <LampSilhouette tone={p.shade_tone ?? 'warm'} scale={1.3} />
        )}

        {sold && (
          <div
            style={{
              position: 'absolute',
              top: 12,
              left: 12,
              fontFamily: 'var(--font-mono)',
              fontSize: 9,
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              background: 'var(--travertino)',
              color: 'var(--fg-muted)',
              padding: '4px 8px',
            }}
          >
            SOLD
          </div>
        )}

        {reserved && (
          <div
            style={{
              position: 'absolute',
              top: 12,
              left: 12,
              fontFamily: 'var(--font-mono)',
              fontSize: 9,
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              border: '1px solid var(--ottone-brunito)',
              color: 'var(--ottone-brunito)',
              padding: '4px 8px',
            }}
          >
            RESERVED
          </div>
        )}
      </div>

      {/* Metadata */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <LotMark n={p.lot} label={p.type} level="sm" />

        <div
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 22,
            lineHeight: 1.15,
            letterSpacing: '0.01em',
            fontStyle: 'italic',
          }}
        >
          {p.title}
        </div>

        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            opacity: 0.8,
          }}
        >
          {p.maison} · {p.year}
        </div>

        <hr
          style={{
            border: 0,
            height: 1,
            background: 'var(--ottone-brunito)',
            width: 32,
            margin: '8px 0',
          }}
        />

        <div
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 20,
            letterSpacing: '0.01em',
          }}
        >
          {sold ? (
            <span style={{ opacity: 0.45, fontSize: 13, fontFamily: 'var(--font-mono)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
              Sold
            </span>
          ) : (
            `€ ${p.price.toLocaleString('en-GB')}`
          )}
        </div>
      </div>
    </Link>
  );
}

export default function CatalogueClient({ products, imageMap = {} }: Props) {
  const [active, setActive] = useState('All');
  const [showSold, setShowSold] = useState(false);

  const available = products.filter((p) => p.status !== 'sold');
  const sold = products.filter((p) => p.status === 'sold');

  const filtered = available.filter((p) => inDecade(p.year, active));
  const filteredSold = sold.filter((p) => inDecade(p.year, active));

  return (
    <div style={{ padding: '64px var(--page-px) 96px' }}>
      {/* Page header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          marginBottom: 8,
          flexWrap: 'wrap',
          gap: 16,
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 56,
            fontWeight: 400,
            letterSpacing: '0.02em',
            margin: 0,
            lineHeight: 1,
          }}
        >
          <em>Catalogue</em>
        </h1>
        <MonoCaps opacity={0.6}>
          {filtered.length} pieces available
        </MonoCaps>
      </div>

      <DrawRule width={80} style={{ margin: '24px 0 32px' }} />

      {/* Decade filter */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 56 }}>
        {DECADES.map((d) => (
          <button
            key={d}
            onClick={() => setActive(d)}
            aria-pressed={d === active}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              textTransform: 'uppercase',
              letterSpacing: '0.16em',
              padding: '8px 14px',
              border: '1px solid var(--inchiostro)',
              background: d === active ? 'var(--inchiostro)' : 'transparent',
              color: d === active ? 'var(--avorio)' : 'var(--inchiostro)',
              cursor: 'pointer',
              transition: 'background 120ms ease, color 120ms ease',
            }}
          >
            {d}
          </button>
        ))}
      </div>

      {/* Available + Reserved grid */}
      {filtered.length === 0 ? (
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 15,
            opacity: 0.6,
            marginBottom: 56,
          }}
        >
          No pieces available in this selection.
        </p>
      ) : (
        <RevealOnScroll stagger={0.07} className="grid-3">
          {filtered.map((p) => (
            <ProductCard key={p.id} p={p} imageUrl={imageMap[p.id]} />
          ))}
        </RevealOnScroll>
      )}

      {/* Sold archive toggle */}
      {filteredSold.length > 0 && (
        <div style={{ marginTop: 80 }}>
          <button
            onClick={() => setShowSold((s) => !s)}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              textTransform: 'uppercase',
              letterSpacing: '0.16em',
              background: 'none',
              border: 0,
              cursor: 'pointer',
              color: 'var(--fg-muted)',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginBottom: 24,
            }}
          >
            <span
              style={{
                display: 'inline-block',
                width: 32,
                height: 1,
                background: 'var(--ottone-brunito)',
              }}
            />
            Sold archive ({filteredSold.length})
            <span style={{ opacity: 0.5 }}>{showSold ? '↑' : '↓'}</span>
          </button>

          {showSold && (
            <RevealOnScroll stagger={0.05} className="grid-3">
              {filteredSold.map((p) => (
                <ProductCard key={p.id} p={p} imageUrl={imageMap[p.id]} />
              ))}
            </RevealOnScroll>
          )}
        </div>
      )}
    </div>
  );
}
