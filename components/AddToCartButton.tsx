'use client';

import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { CartItem, ProductStatus } from '@/types/database';

type Props = {
  item: CartItem;
  status: ProductStatus;
};

export default function AddToCartButton({ item, status }: Props) {
  const { add, remove, contains } = useCart();
  const inCart = contains(item.productId);

  if (status === 'sold') {
    return (
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: '0.16em',
          padding: '16px 28px',
          background: 'var(--travertino)',
          color: 'var(--fg-muted)',
          display: 'inline-block',
          lineHeight: 1,
        }}
      >
        SOLD
      </div>
    );
  }

  if (status === 'reserved') {
    return (
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: '0.16em',
          padding: '16px 28px',
          border: '1px solid var(--inchiostro)',
          color: 'var(--fg-muted)',
          display: 'inline-block',
          lineHeight: 1,
        }}
      >
        RESERVED
      </div>
    );
  }

  if (inCart) {
    return (
      <button
        onClick={() => remove(item.productId)}
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: '0.16em',
          padding: '16px 28px',
          background: 'transparent',
          color: 'var(--inchiostro)',
          border: '1px solid var(--inchiostro)',
          cursor: 'pointer',
          display: 'inline-block',
          lineHeight: 1,
          transition: 'background 120ms ease',
        }}
      >
        IN CART · REMOVE
      </button>
    );
  }

  return (
    <button
      onClick={() => add(item)}
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        textTransform: 'uppercase',
        letterSpacing: '0.16em',
        padding: '16px 28px',
        background: 'var(--inchiostro)',
        color: 'var(--avorio)',
        border: 0,
        cursor: 'pointer',
        display: 'inline-block',
        lineHeight: 1,
        transition: 'background 120ms ease',
      }}
    >
      ADD TO CART
    </button>
  );
}
