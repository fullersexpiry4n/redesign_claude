import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import DrawRule from '@/components/gsap/DrawRule';

export const metadata: Metadata = {
  title: 'About · RE·DESIGN',
  description:
    "RE·DESIGN is a private dealer of authored Italian lighting from the post-war period. Documented pieces, restored, with verified provenance.",
};

export default function AboutPage() {
  return (
    <div style={{ padding: '64px var(--page-px) 96px' }}>
      {/* Hero */}
      <div style={{ maxWidth: 760, marginBottom: 80 }}>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            textTransform: 'uppercase',
            letterSpacing: '0.22em',
            opacity: 0.5,
            marginBottom: 24,
          }}
        >
          Milano · EST. 2020
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(36px, 5vw, 64px)',
            fontWeight: 400,
            fontStyle: 'italic',
            letterSpacing: '0.02em',
            lineHeight: 1.1,
            margin: '0 0 32px',
          }}
        >
          We do not sell objects.<br />
          We document periods.
        </h1>

        <DrawRule width={64} style={{ margin: '0 0 32px' }} />

        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 17,
            lineHeight: 1.8,
            maxWidth: '56ch',
            margin: 0,
          }}
        >
          RE·DESIGN is a private dealer specialising in authored Italian lighting produced
          between 1960 and 2000. We work with documented pieces from historic maisons —
          Stilnovo, Arteluce, Arredoluce, Flos, O‑Luce — and with the designers who
          defined that era.
        </p>
      </div>

      {/* Two-col section */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '64px 80px',
          marginBottom: 80,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: 'var(--ottone-brunito)',
              marginBottom: 16,
            }}
          >
            Our method
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 26,
              fontWeight: 400,
              fontStyle: 'italic',
              margin: '0 0 16px',
            }}
          >
            Only pieces we have handled
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 14,
              lineHeight: 1.75,
              maxWidth: '44ch',
            }}
          >
            We do not list what we have not examined in person. Every piece is
            photographed, measured, and dated. Wiring is replaced and CE compliant.
            Provenance is traced as far as memory allows.
          </p>
        </div>

        <div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: 'var(--ottone-brunito)',
              marginBottom: 16,
            }}
          >
            One of a kind
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 26,
              fontWeight: 400,
              fontStyle: 'italic',
              margin: '0 0 16px',
            }}
          >
            One lot at a time
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 14,
              lineHeight: 1.75,
              maxWidth: '44ch',
            }}
          >
            Every piece we offer is a unique specimen — one lot, one story.
            We do not stock multiples or repeat acquisitions. When a piece leaves,
            it does not come back. That is the value we protect.
          </p>
        </div>

        <div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: 'var(--ottone-brunito)',
              marginBottom: 16,
            }}
          >
            Restoration
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 26,
              fontWeight: 400,
              fontStyle: 'italic',
              margin: '0 0 16px',
            }}
          >
            Conservative, not corrective
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 14,
              lineHeight: 1.75,
              maxWidth: '44ch',
            }}
          >
            Restoration respects the patina of time. We clean, we do not strip. We
            rewire safely, we do not refinish. Every mark of use is part of the document.
            The object must tell its age, not hide it.
          </p>
        </div>

        <div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: 'var(--ottone-brunito)',
              marginBottom: 16,
            }}
          >
            Shipping
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 26,
              fontWeight: 400,
              fontStyle: 'italic',
              margin: '0 0 16px',
            }}
          >
            Bespoke packaging
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 14,
              lineHeight: 1.75,
              maxWidth: '44ch',
            }}
          >
            Every shipment is designed around the specific piece. Wooden crates,
            custom padding. We ship throughout Europe and internationally on request.
            Cost is calculated and confirmed before dispatch.
          </p>
        </div>
      </div>

      {/* Quote / manifesto */}
      <div
        style={{
          borderLeft: '2px solid var(--ottone-brunito)',
          paddingLeft: 32,
          margin: '80px 0',
          maxWidth: 640,
        }}
      >
        <blockquote
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(20px, 3vw, 28px)',
            fontStyle: 'italic',
            fontWeight: 400,
            lineHeight: 1.5,
            margin: 0,
          }}
        >
          "Italian design of the Sixties and Seventies is not nostalgia.
           It is the moment when industrial form met craft and produced
           something unrepeatable."
        </blockquote>
      </div>

      {/* CTA */}
      <div
        style={{
          display: 'flex',
          gap: 24,
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <Link
          href="/catalogue"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            textTransform: 'uppercase',
            letterSpacing: '0.16em',
            padding: '14px 28px',
            background: 'var(--inchiostro)',
            color: 'var(--avorio)',
            textDecoration: 'none',
            lineHeight: 1,
            display: 'inline-block',
          }}
        >
          Browse the catalogue
        </Link>
        <Link
          href="/contact"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            textTransform: 'uppercase',
            letterSpacing: '0.16em',
            padding: '14px 28px',
            border: '1px solid var(--inchiostro)',
            color: 'var(--inchiostro)',
            textDecoration: 'none',
            lineHeight: 1,
            display: 'inline-block',
          }}
        >
          RICHIESTA · ENQUIRE
        </Link>
      </div>
    </div>
  );
}
