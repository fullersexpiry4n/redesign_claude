import React from 'react';
import MonoCaps from '@/components/atoms/MonoCaps';
import DrawRule from '@/components/gsap/DrawRule';
import RevealOnScroll from '@/components/gsap/RevealOnScroll';

export default function VisitaPage() {
  return (
    <div style={{ padding: '96px var(--page-px)', maxWidth: 800 }}>
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
        <em>Visit</em>
      </h1>

      <DrawRule width={80} style={{ margin: '24px 0 32px' }} />

      <RevealOnScroll>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 16,
            lineHeight: 1.75,
            maxWidth: '56ch',
          }}
        >
          The showroom is in Milan, in the Brera district. By appointment, Tuesday — Saturday.
          Each piece in the catalogue is photographed where it sits; visiting in person is
          the only way to assess condition, to read patina, to see the lamp doing its job.
        </p>
      </RevealOnScroll>

      <RevealOnScroll delay={0.1}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '120px 1fr',
            gap: '16px 32px',
            marginTop: 48,
          }}
        >
          {[
            ['Address', 'Via dell\'Orso 12 · 20121 Milano'],
            ['Hours', 'Tue — Sat · 11:00 — 18:00 · by appointment'],
            ['Contact', 'visita@redesign.shop'],
            ['Phone', '+39 02 8242 0000'],
          ].map(([label, value]) => (
            <React.Fragment key={label}>
              <MonoCaps size={10} opacity={0.55} as="div">
                {label}
              </MonoCaps>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 13,
                  letterSpacing: '0.04em',
                  lineHeight: 1.5,
                }}
              >
                {label === 'Contact' ? (
                  <a
                    href="mailto:visita@redesign.shop"
                    style={{ color: 'var(--ottone-brunito)', borderBottom: '1px solid var(--ottone-brunito)' }}
                  >
                    {value}
                  </a>
                ) : (
                  value
                )}
              </div>
            </React.Fragment>
          ))}
        </div>
      </RevealOnScroll>

      <RevealOnScroll delay={0.15}>
        <div style={{ marginTop: 64 }}>
          <hr
            style={{
              border: 0,
              height: 1,
              background: 'var(--ottone-brunito)',
              width: 48,
              margin: '0 0 24px',
            }}
          />
          <MonoCaps size={11} opacity={0.6} as="div" style={{ marginBottom: 12 }}>
            § How to find us
          </MonoCaps>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 14,
              lineHeight: 1.7,
              maxWidth: '46ch',
            }}
          >
            Metro: Lanza (M2), 3 min walk. Tram: lines 12/14, stop
            Pontaccio. Parking: Monumentale, 400 m.
          </p>
        </div>
      </RevealOnScroll>
    </div>
  );
}
