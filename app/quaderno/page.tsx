import React from 'react';
import { QUADERNO_ARTICLES, PIECES } from '@/data/pieces';
import MonoCaps from '@/components/atoms/MonoCaps';
import DrawRule from '@/components/gsap/DrawRule';
import RevealOnScroll from '@/components/gsap/RevealOnScroll';
import BrassRule from '@/components/atoms/BrassRule';

export default function QuadernoPage() {
  const featured = QUADERNO_ARTICLES[0];
  const rest = QUADERNO_ARTICLES.slice(1);
  const ritorni = PIECES.slice(0, 3);

  return (
    <div style={{ padding: '64px var(--page-px) 96px' }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
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
          <em>Quaderno</em>
        </h1>
        <MonoCaps opacity={0.6}>Notebook · Est. MMXXVI</MonoCaps>
      </div>

      <DrawRule width={80} style={{ margin: '24px 0 48px' }} />

      {/* Featured article + Ritorni sidebar */}
      <RevealOnScroll>
        <article className="grid-quaderno" style={{ marginBottom: 64 }}>
          {/* Main article */}
          <div>
            <MonoCaps size={11} opacity={0.6}>
              № {featured.n} · {featured.readTime} min
            </MonoCaps>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 32,
                fontWeight: 400,
                lineHeight: 1.15,
                margin: '14px 0 24px',
                letterSpacing: '0.01em',
              }}
            >
              {featured.title}
            </h2>
            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 14,
                lineHeight: 1.75,
              }}
            >
              {featured.body.map((para, i) => (
                <p
                  key={i}
                  style={{ margin: i === featured.body.length - 1 ? 0 : '0 0 1em' }}
                  className={i === 0 ? 'dropcap' : undefined}
                >
                  {para}
                </p>
              ))}
            </div>
          </div>

          {/* Ritorni sidebar */}
          <aside>
            <MonoCaps size={11} opacity={0.6}>Latest arrivals</MonoCaps>
            <BrassRule short style={{ margin: '12px 0 18px' }} />
            {ritorni.map((p) => (
              <div
                key={p.lot}
                style={{
                  padding: '14px 0',
                  borderBottom: '1px solid rgba(20,20,20,0.08)',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 17,
                    fontStyle: 'italic',
                    lineHeight: 1.3,
                  }}
                >
                  {p.maisonName} {p.type}, {p.city}
                </div>
                <MonoCaps size={10} opacity={0.55} style={{ marginTop: 6, display: 'inline-block' }}>
                  № {p.lot}
                </MonoCaps>
              </div>
            ))}
          </aside>
        </article>
      </RevealOnScroll>

      {/* More articles */}
      <DrawRule width={80} />

      <RevealOnScroll stagger={0.1} style={{ marginTop: 48 }}>
        {rest.map((article) => (
          <div
            key={article.n}
            style={{
              display: 'grid',
              gridTemplateColumns: '80px 1fr',
              gap: 32,
              paddingBottom: 40,
              marginBottom: 40,
              borderBottom: '1px solid rgba(20,20,20,0.08)',
            }}
          >
            <MonoCaps size={11} opacity={0.5}>
              № {article.n}
            </MonoCaps>
            <div>
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 22,
                  fontWeight: 400,
                  letterSpacing: '0.01em',
                  margin: '0 0 8px',
                }}
              >
                {article.title}
              </h3>
              <MonoCaps size={10} opacity={0.55}>
                {article.readTime} min
              </MonoCaps>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 14,
                  lineHeight: 1.65,
                  marginTop: 12,
                  opacity: 0.8,
                }}
              >
                {article.body[0].slice(0, 160)}…
              </p>
            </div>
          </div>
        ))}
      </RevealOnScroll>
    </div>
  );
}
