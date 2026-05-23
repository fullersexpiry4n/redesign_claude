'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function AdminLogout() {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        textTransform: 'uppercase',
        letterSpacing: '0.14em',
        padding: '10px 20px',
        background: 'transparent',
        color: 'var(--inchiostro)',
        border: '1px solid rgba(20,20,20,0.3)',
        cursor: 'pointer',
        lineHeight: 1,
        whiteSpace: 'nowrap',
      }}
    >
      Sign out
    </button>
  );
}
