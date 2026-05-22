import React from 'react';
import { MAISONS } from '@/data/pieces';
import MonoCaps from '@/components/atoms/MonoCaps';
import DrawRule from '@/components/gsap/DrawRule';
import RevealOnScroll from '@/components/gsap/RevealOnScroll';

export default function MaisonsPage() {
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
          <em>Maisons</em>
        </h1>
        <MonoCaps opacity={0.6}>{MAISONS.length} case · 1932 — présent</MonoCaps>
      </div>

      <DrawRule width={80} style={{ margin: '24px 0 0' }} />

      <RevealOnScroll stagger={0.06}>
        {MAISONS.map(({ name, city, dates, count, bio }) => (
          <div key={name} className="maison-row">
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 28,
                  letterSpacing: '0.01em',
                  marginBottom: bio ? 10 : 0,
                }}
              >
                {name}
              </div>
              {bio && (
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 13,
                    lineHeight: 1.65,
                    maxWidth: '52ch',
                    opacity: 0.75,
                    margin: 0,
                  }}
                >
                  {bio}
                </p>
              )}
            </div>
            <MonoCaps size={11} opacity={0.7} style={{ paddingTop: 6 }} className="maison-row-city">
              {city}
            </MonoCaps>
            <MonoCaps size={11} opacity={0.55} style={{ paddingTop: 6 }} className="maison-row-dates">
              {dates}
            </MonoCaps>
            <MonoCaps
              size={11}
              style={{
                textAlign: 'right',
                color: 'var(--ottone-brunito)',
                paddingTop: 6,
              }}
            >
              {count} →
            </MonoCaps>
          </div>
        ))}
      </RevealOnScroll>
    </div>
  );
}
