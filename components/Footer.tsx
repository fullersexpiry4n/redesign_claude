import React from 'react';
import Link from 'next/link';
import Wordmark from './Wordmark';

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--ottone-brunito)',
        padding: '56px var(--page-px) 48px',
        background: 'var(--avorio)',
      }}
    >
      <div className="grid-footer">
        {/* Brand */}
        <div style={{ gridColumn: '1 / 2' }}>
          <Wordmark size={20} />
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              opacity: 0.55,
              marginTop: 12,
              lineHeight: 1.7,
            }}
          >
            Italian Design Lighting<br />
            1960 — 2000<br />
            Milano · redesign.shop
          </div>
        </div>

        {/* Catalogue */}
        <div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              opacity: 0.5,
              marginBottom: 16,
            }}
          >
            Catalogue
          </div>
          {[
            { label: 'Catalogue', href: '/catalogue' },
            { label: 'Maisons', href: '/maisons' },
            { label: 'Designers', href: '/designers' },
          ].map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              style={{
                display: 'block',
                fontFamily: 'var(--font-sans)',
                fontSize: 13,
                color: 'var(--inchiostro)',
                marginBottom: 10,
                borderBottom: '1px solid transparent',
                transition: 'border-color 120ms ease',
                width: 'fit-content',
              }}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Editorial */}
        <div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              opacity: 0.5,
              marginBottom: 16,
            }}
          >
            Editorial
          </div>
          {[
            { label: 'Quaderno', href: '/quaderno' },
            { label: 'Visita', href: '/visita' },
          ].map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              style={{
                display: 'block',
                fontFamily: 'var(--font-sans)',
                fontSize: 13,
                color: 'var(--inchiostro)',
                marginBottom: 10,
                borderBottom: '1px solid transparent',
                transition: 'border-color 120ms ease',
                width: 'fit-content',
              }}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Contact */}
        <div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              opacity: 0.5,
              marginBottom: 16,
            }}
          >
            Contact
          </div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              lineHeight: 1.8,
              letterSpacing: '0.04em',
            }}
          >
            <div>Via dell&#39;Orso 12</div>
            <div>20121 Milano · Italia</div>
            <div style={{ marginTop: 8 }}>
              <a
                href="mailto:visita@redesign.shop"
                style={{ color: 'var(--ottone-brunito)', borderBottom: '1px solid var(--ottone-brunito)' }}
              >
                visita@redesign.shop
              </a>
            </div>
            <div>
              <a
                href="mailto:trade@redesign.shop"
                style={{ color: 'var(--ottone-brunito)', borderBottom: '1px solid var(--ottone-brunito)' }}
              >
                trade@redesign.shop
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: '1px solid rgba(20,20,20,0.1)',
          paddingTop: 24,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            opacity: 0.45,
          }}
        >
          © {new Date().getFullYear()} RE·DESIGN · P. IVA IT 01234567890
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            opacity: 0.45,
          }}
        >
          № 001 · Edition MMXXVI
        </span>
      </div>
    </footer>
  );
}
