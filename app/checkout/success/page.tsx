import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Order confirmed · RE·DESIGN',
  robots: { index: false },
};

export default function CheckoutSuccessPage() {
  return (
    <div
      style={{
        padding: '80px var(--page-px) 120px',
        maxWidth: 600,
        margin: '0 auto',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          opacity: 0.55,
          marginBottom: 24,
        }}
      >
        Order confirmed
      </div>

      <h1
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 42,
          fontWeight: 400,
          fontStyle: 'italic',
          letterSpacing: '0.02em',
          margin: '0 0 8px',
          lineHeight: 1.1,
        }}
      >
        Thank you for your purchase.
      </h1>

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
          lineHeight: 1.75,
          margin: '0 0 16px',
          maxWidth: '48ch',
        }}
      >
        Payment received. You will receive an email confirmation shortly.
      </p>
      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 14,
          lineHeight: 1.75,
          margin: '0 0 40px',
          opacity: 0.7,
          maxWidth: '48ch',
        }}
      >
        Payment received. You will receive an email confirmation shortly. We will be in touch
        to arrange shipping and packaging.
      </p>

      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
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
          Back to catalogue
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
          Contact us
        </Link>
      </div>
    </div>
  );
}
