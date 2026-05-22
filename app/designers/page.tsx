'use client';

import React, { useState } from 'react';
import { DESIGNERS } from '@/data/pieces';
import MonoCaps from '@/components/atoms/MonoCaps';
import Button from '@/components/atoms/Button';
import DrawRule from '@/components/gsap/DrawRule';
import RevealOnScroll from '@/components/gsap/RevealOnScroll';

export default function DesignersPage() {
  const [active, setActive] = useState(0);
  const d = DESIGNERS[active];

  return (
    <div style={{ padding: '64px var(--page-px) 96px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          marginBottom: 8,
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
          <em>Designers</em>
        </h1>
        <MonoCaps opacity={0.6}>
          {DESIGNERS.length} autori · 1912 — presente
        </MonoCaps>
      </div>

      <DrawRule width={80} style={{ margin: '24px 0 48px' }} />

      <div className="grid-designers">
        {/* Index */}
        <RevealOnScroll stagger={0.05}>
          {DESIGNERS.map((des, i) => (
            <div
              key={des.name}
              onClick={() => setActive(i)}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                padding: '20px 0',
                alignItems: 'baseline',
                borderBottom: '1px solid rgba(20,20,20,0.08)',
                cursor: 'pointer',
                opacity: active === i ? 1 : 0.6,
                transition: 'opacity 120ms ease',
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 24,
                    letterSpacing: '0.01em',
                    lineHeight: 1.1,
                    fontStyle: active === i ? 'italic' : 'normal',
                  }}
                >
                  {des.name}
                </div>
                <MonoCaps
                  size={10}
                  opacity={0.6}
                  style={{ marginTop: 6, display: 'inline-block' }}
                >
                  {des.years} · {des.city}
                </MonoCaps>
              </div>
              <MonoCaps
                size={11}
                style={{
                  color: active === i ? 'var(--ottone-brunito)' : 'var(--inchiostro)',
                  opacity: active === i ? 1 : 0.5,
                }}
              >
                {des.pieces} pieces {active === i ? '→' : ''}
              </MonoCaps>
            </div>
          ))}
        </RevealOnScroll>

        {/* Detail panel */}
        <div style={{ position: 'sticky', top: 120 }}>
          <MonoCaps size={11} opacity={0.6}>
            § Designer {String(active + 1).padStart(2, '0')} /{' '}
            {String(DESIGNERS.length).padStart(2, '0')}
          </MonoCaps>

          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 48,
              fontWeight: 400,
              letterSpacing: '0.01em',
              lineHeight: 1.05,
              margin: '14px 0 8px',
              fontStyle: 'italic',
            }}
          >
            {d.name}
          </h2>

          <MonoCaps size={11}>
            {d.years} · {d.city.toUpperCase()}
          </MonoCaps>

          <hr
            style={{
              border: 0,
              height: 1,
              background: 'var(--ottone-brunito)',
              width: 48,
              margin: '24px 0',
            }}
          />

          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 15,
              lineHeight: 1.7,
              maxWidth: '54ch',
            }}
          >
            {d.bio}
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '120px 1fr',
              gap: '12px 24px',
              marginTop: 24,
              marginBottom: 32,
            }}
          >
            <MonoCaps size={10} opacity={0.55}>Maison</MonoCaps>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                letterSpacing: '0.04em',
              }}
            >
              {d.maison}
            </div>
            <MonoCaps size={10} opacity={0.55}>In catalogo</MonoCaps>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                letterSpacing: '0.04em',
              }}
            >
              {d.pieces} documented pieces
            </div>
          </div>

          <Button variant="ghost" href="/catalogue">
            VEDI I PEZZI · VIEW PIECES
          </Button>
        </div>
      </div>
    </div>
  );
}
