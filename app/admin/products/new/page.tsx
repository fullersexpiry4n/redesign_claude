import React from 'react';
import Link from 'next/link';
import ProductForm from '../ProductForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'New piece · Admin · RE·DESIGN',
  robots: { index: false },
};

export default function NewProductPage() {
  return (
    <div style={{ padding: '48px var(--page-px) 96px', maxWidth: 960 }}>
      <Link
        href="/admin"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: '0.14em',
          color: 'var(--fg-muted)',
          textDecoration: 'none',
          display: 'inline-block',
          marginBottom: 32,
        }}
      >
        ← Dashboard
      </Link>

      <h1
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 32,
          fontWeight: 400,
          fontStyle: 'italic',
          margin: '0 0 8px',
        }}
      >
        New piece
      </h1>

      <hr
        style={{
          border: 0,
          height: 1,
          background: 'var(--ottone-brunito)',
          margin: '20px 0 36px',
          width: 48,
        }}
      />

      <ProductForm />
    </div>
  );
}
