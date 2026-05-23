'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';

export default function CartBadge() {
  const { count } = useCart();

  return (
    <Link
      href="/cart"
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        textTransform: 'uppercase',
        letterSpacing: '0.18em',
        color: count > 0 ? 'var(--ottone-brunito)' : 'var(--inchiostro)',
        textDecoration: 'none',
        paddingBottom: 4,
        borderBottom: '1px solid transparent',
        transition: 'border-color 120ms ease, color 120ms ease',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderBottomColor = 'var(--ottone-brunito)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderBottomColor = 'transparent';
      }}
    >
      {count > 0 ? `Cart (${count})` : 'Cart'}
    </Link>
  );
}
