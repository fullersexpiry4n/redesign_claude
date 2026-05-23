import React from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import AdminLogout from './AdminLogout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin · RE·DESIGN',
  robots: { index: false },
};

const STATUS_LABEL: Record<string, string> = {
  available: 'Available',
  reserved: 'Reserved',
  sold: 'Sold',
};

const STATUS_COLOR: Record<string, string> = {
  available: '#2D6A2D',
  reserved: '#8B6914',
  sold: '#8B1A1A',
};

export default async function AdminPage() {
  const supabase = await createClient();

  const { data: products } = await supabase
    .from('products')
    .select('id, lot, title, maison_name, price, status, created_at')
    .order('created_at', { ascending: false });

  const { data: orders } = await supabase
    .from('orders')
    .select('id, customer_email, amount, currency, status, created_at')
    .order('created_at', { ascending: false })
    .limit(20);

  const stats = {
    available: products?.filter((p) => p.status === 'available').length ?? 0,
    reserved: products?.filter((p) => p.status === 'reserved').length ?? 0,
    sold: products?.filter((p) => p.status === 'sold').length ?? 0,
    total: products?.length ?? 0,
  };

  return (
    <div style={{ padding: '48px var(--page-px) 96px' }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          marginBottom: 8,
          flexWrap: 'wrap',
          gap: 16,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              opacity: 0.5,
              marginBottom: 8,
            }}
          >
            RE·DESIGN Admin
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 36,
              fontWeight: 400,
              fontStyle: 'italic',
              margin: 0,
            }}
          >
            Dashboard
          </h1>
        </div>

        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Link
            href="/admin/reprocess"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              padding: '10px 20px',
              border: '1px solid rgba(20,20,20,0.3)',
              color: 'var(--inchiostro)',
              textDecoration: 'none',
              lineHeight: 1,
              whiteSpace: 'nowrap',
            }}
          >
            Reprocess images
          </Link>
          <Link
            href="/admin/products/new"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              padding: '10px 20px',
              background: 'var(--inchiostro)',
              color: 'var(--avorio)',
              textDecoration: 'none',
              lineHeight: 1,
              whiteSpace: 'nowrap',
            }}
          >
            + New piece
          </Link>
          <AdminLogout />
        </div>
      </div>

      <hr
        style={{
          border: 0,
          height: 1,
          background: 'var(--ottone-brunito)',
          margin: '24px 0 40px',
        }}
      />

      {/* Stats */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: 16,
          marginBottom: 56,
        }}
      >
        {[
          { label: 'Total', value: stats.total },
          { label: 'Available', value: stats.available, color: STATUS_COLOR.available },
          { label: 'Reserved', value: stats.reserved, color: STATUS_COLOR.reserved },
          { label: 'Sold', value: stats.sold, color: STATUS_COLOR.sold },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            style={{
              padding: '20px 24px',
              border: '1px solid rgba(20,20,20,0.12)',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                textTransform: 'uppercase',
                letterSpacing: '0.16em',
                opacity: 0.55,
                marginBottom: 8,
              }}
            >
              {label}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 32,
                color: color ?? 'var(--inchiostro)',
              }}
            >
              {value}
            </div>
          </div>
        ))}
      </div>

      {/* Products table */}
      <h2
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: '0.18em',
          marginBottom: 16,
          fontWeight: 400,
        }}
      >
        Products
      </h2>

      <div style={{ overflowX: 'auto', marginBottom: 64 }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
          }}
        >
          <thead>
            <tr
              style={{
                borderBottom: '1px solid rgba(20,20,20,0.2)',
                textAlign: 'left',
              }}
            >
              {['Lot', 'Title', 'Maison', 'Price', 'Status', 'Actions'].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: '10px 16px 10px 0',
                    fontWeight: 400,
                    textTransform: 'uppercase',
                    letterSpacing: '0.14em',
                    fontSize: 10,
                    opacity: 0.55,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(products ?? []).map((p) => (
              <tr
                key={p.id}
                style={{ borderBottom: '1px solid rgba(20,20,20,0.07)' }}
              >
                <td style={{ padding: '12px 16px 12px 0', opacity: 0.6 }}>{p.lot}</td>
                <td style={{ padding: '12px 16px 12px 0', maxWidth: 220 }}>
                  <Link
                    href={`/catalogue/${p.lot}`}
                    target="_blank"
                    style={{ color: 'var(--inchiostro)', textDecoration: 'none' }}
                  >
                    {p.title}
                  </Link>
                </td>
                <td style={{ padding: '12px 16px 12px 0', opacity: 0.7 }}>{p.maison_name}</td>
                <td style={{ padding: '12px 16px 12px 0', whiteSpace: 'nowrap' }}>
                  € {p.price.toLocaleString('it-IT')}
                </td>
                <td style={{ padding: '12px 16px 12px 0' }}>
                  <span
                    style={{
                      color: STATUS_COLOR[p.status] ?? 'inherit',
                      textTransform: 'uppercase',
                      fontSize: 10,
                      letterSpacing: '0.12em',
                    }}
                  >
                    {STATUS_LABEL[p.status] ?? p.status}
                  </span>
                </td>
                <td style={{ padding: '12px 16px 12px 0', whiteSpace: 'nowrap' }}>
                  <Link
                    href={`/admin/products/${p.id}`}
                    style={{
                      color: 'var(--ottone-brunito)',
                      textDecoration: 'none',
                      marginRight: 16,
                      textTransform: 'uppercase',
                      fontSize: 10,
                      letterSpacing: '0.12em',
                    }}
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Orders table */}
      <h2
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: '0.18em',
          marginBottom: 16,
          fontWeight: 400,
        }}
      >
        Recent orders
      </h2>

      <div style={{ overflowX: 'auto' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
          }}
        >
          <thead>
            <tr
              style={{
                borderBottom: '1px solid rgba(20,20,20,0.2)',
                textAlign: 'left',
              }}
            >
              {['Date', 'Customer', 'Amount', 'Status'].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: '10px 16px 10px 0',
                    fontWeight: 400,
                    textTransform: 'uppercase',
                    letterSpacing: '0.14em',
                    fontSize: 10,
                    opacity: 0.55,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(orders ?? []).length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  style={{
                    padding: '24px 0',
                    opacity: 0.5,
                    fontSize: 12,
                  }}
                >
                  No orders yet.
                </td>
              </tr>
            ) : (
              (orders ?? []).map((o) => (
                <tr
                  key={o.id}
                  style={{ borderBottom: '1px solid rgba(20,20,20,0.07)' }}
                >
                  <td style={{ padding: '12px 16px 12px 0', opacity: 0.7, whiteSpace: 'nowrap' }}>
                    {new Date(o.created_at).toLocaleDateString('en-GB')}
                  </td>
                  <td style={{ padding: '12px 16px 12px 0' }}>
                    {o.customer_email ?? '—'}
                  </td>
                  <td style={{ padding: '12px 16px 12px 0', whiteSpace: 'nowrap' }}>
                    € {(o.amount / 100).toLocaleString('en-GB')}
                  </td>
                  <td style={{ padding: '12px 16px 12px 0' }}>
                    <span
                      style={{
                        color: o.status === 'paid' ? STATUS_COLOR.available : STATUS_COLOR.sold,
                        textTransform: 'uppercase',
                        fontSize: 10,
                        letterSpacing: '0.12em',
                      }}
                    >
                      {o.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
