'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import type { Metadata } from 'next';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError('Credenziali non valide. · Invalid credentials.');
      setLoading(false);
      return;
    }

    router.push('/admin');
    router.refresh();
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px var(--page-px)',
        background: 'var(--avorio)',
      }}
    >
      <div style={{ width: '100%', maxWidth: 400 }}>
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
          RE·DESIGN Admin
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 32,
            fontWeight: 400,
            fontStyle: 'italic',
            margin: '0 0 32px',
          }}
        >
          Sign in
        </h1>

        <form onSubmit={handleSubmit} noValidate>
          <div style={{ marginBottom: 20 }}>
            <label
              htmlFor="login-email"
              style={{
                display: 'block',
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                textTransform: 'uppercase',
                letterSpacing: '0.16em',
                opacity: 0.6,
                marginBottom: 8,
              }}
            >
              Email
            </label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-required="true"
              autoComplete="email"
              inputMode="email"
              style={{
                width: '100%',
                fontFamily: 'var(--font-mono)',
                fontSize: 13,
                padding: '12px 14px',
                border: '1px solid rgba(20,20,20,0.3)',
                background: 'transparent',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div style={{ marginBottom: 32 }}>
            <label
              htmlFor="login-password"
              style={{
                display: 'block',
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                textTransform: 'uppercase',
                letterSpacing: '0.16em',
                opacity: 0.6,
                marginBottom: 8,
              }}
            >
              Password
            </label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-required="true"
              autoComplete="current-password"
              style={{
                width: '100%',
                fontFamily: 'var(--font-mono)',
                fontSize: 13,
                padding: '12px 14px',
                border: '1px solid rgba(20,20,20,0.3)',
                background: 'transparent',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {error && (
            <div
              role="alert"
              aria-live="polite"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                color: '#8B1A1A',
                border: '1px solid #8B1A1A',
                padding: '10px 14px',
                marginBottom: 24,
                letterSpacing: '0.08em',
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              textTransform: 'uppercase',
              letterSpacing: '0.16em',
              padding: '16px',
              background: loading ? 'var(--fg-muted)' : 'var(--inchiostro)',
              color: 'var(--avorio)',
              border: 0,
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background 120ms ease',
              lineHeight: 1,
            }}
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}
