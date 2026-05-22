'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';

export default function CartPage() {
  const { items, remove, clear, count } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const total = items.reduce((sum, i) => sum + i.price, 0);

  async function handleCheckout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'Checkout failed. Please try again.');
        return;
      }
      if (data.url) {
        clear();
        window.location.href = data.url;
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: '64px var(--page-px) 96px', maxWidth: 800, margin: '0 auto' }}>
      <h1
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 48,
          fontWeight: 400,
          letterSpacing: '0.02em',
          margin: '0 0 8px',
          fontStyle: 'italic',
        }}
      >
        Carrello
      </h1>

      <hr
        style={{
          border: 0,
          height: 1,
          background: 'var(--ottone-brunito)',
          margin: '24px 0 40px',
          width: 64,
        }}
      />

      {count === 0 ? (
        <div style={{ paddingTop: 40 }}>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 16,
              lineHeight: 1.6,
              color: 'var(--fg-muted)',
              margin: '0 0 32px',
            }}
          >
            Your cart is empty.
          </p>
          <Link
            href="/catalogue"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              textTransform: 'uppercase',
              letterSpacing: '0.16em',
              color: 'var(--inchiostro)',
              textDecoration: 'none',
              borderBottom: '1px solid var(--ottone-brunito)',
              paddingBottom: 2,
            }}
          >
            Browse the catalogue
          </Link>
        </div>
      ) : (
        <>
          {/* Item list */}
          <div style={{ marginBottom: 48 }}>
            {items.map((item, idx) => (
              <div
                key={item.productId}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                  gap: 24,
                  alignItems: 'start',
                  padding: '24px 0',
                  borderTop: idx === 0 ? '1px solid rgba(20,20,20,0.12)' : undefined,
                  borderBottom: '1px solid rgba(20,20,20,0.12)',
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 10,
                      textTransform: 'uppercase',
                      letterSpacing: '0.16em',
                      opacity: 0.55,
                      marginBottom: 6,
                    }}
                  >
                    {item.maison_name}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: 22,
                      fontWeight: 400,
                      fontStyle: 'italic',
                      margin: '0 0 4px',
                    }}
                  >
                    <Link
                      href={`/catalogue/${item.lot}`}
                      style={{ color: 'var(--inchiostro)', textDecoration: 'none' }}
                    >
                      {item.title}
                    </Link>
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 11,
                      opacity: 0.6,
                      letterSpacing: '0.1em',
                    }}
                  >
                    LOT {item.lot}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: 22,
                      marginBottom: 12,
                    }}
                  >
                    € {item.price.toLocaleString('it-IT')}
                  </div>
                  <button
                    onClick={() => remove(item.productId)}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 10,
                      textTransform: 'uppercase',
                      letterSpacing: '0.14em',
                      background: 'none',
                      border: 0,
                      cursor: 'pointer',
                      color: 'var(--fg-muted)',
                      padding: 0,
                      textDecoration: 'underline',
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginBottom: 8,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: '0.16em',
                opacity: 0.6,
              }}
            >
              Total ({count} {count === 1 ? 'piece' : 'pieces'})
            </span>
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 28,
              }}
            >
              € {total.toLocaleString('it-IT')}
            </span>
          </div>

          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              opacity: 0.5,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: 32,
            }}
          >
            Shipping and packaging on request
          </p>

          {error && (
            <div
              role="alert"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                color: '#8B1A1A',
                border: '1px solid #8B1A1A',
                padding: '12px 16px',
                marginBottom: 24,
                letterSpacing: '0.08em',
              }}
            >
              {error}
            </div>
          )}

          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'center' }}>
            <button
              onClick={handleCheckout}
              disabled={loading}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: '0.16em',
                padding: '16px 32px',
                background: loading ? 'var(--fg-muted)' : 'var(--inchiostro)',
                color: 'var(--avorio)',
                border: 0,
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'background 120ms ease',
                lineHeight: 1,
              }}
            >
              {loading ? 'Processing…' : 'Proceed to checkout'}
            </button>

            <Link
              href="/catalogue"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                color: 'var(--fg-muted)',
                textDecoration: 'none',
              }}
            >
              Continue browsing
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
