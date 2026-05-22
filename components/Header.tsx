'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Wordmark from './Wordmark';
import CartBadge from './CartBadge';

const NAV = [
  { label: 'Catalogue', href: '/catalogue' },
  { label: 'Maisons',   href: '/maisons' },
  { label: 'Designers', href: '/designers' },
  { label: 'Quaderno',  href: '/quaderno' },
  { label: 'About',     href: '/about' },
  { label: 'Contact',   href: '/contact' },
];

function navLinkStyle(active: boolean): React.CSSProperties {
  return {
    fontFamily: 'var(--font-mono)',
    textTransform: 'uppercase',
    fontSize: 11,
    letterSpacing: '0.18em',
    color: 'var(--inchiostro)',
    textDecoration: 'none',
    paddingBottom: 4,
    borderBottom: active
      ? '1px solid var(--ottone-brunito)'
      : '1px solid transparent',
    transition: 'border-color 120ms ease',
    display: 'inline-block',
  };
}

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() { setMenuOpen(false); }

  return (
    <>
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '28px var(--page-px)',
          borderBottom: '1px solid var(--ottone-brunito)',
          background: 'var(--avorio)',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        <Link href="/" style={{ border: 0, display: 'inline-flex' }} onClick={closeMenu}>
          <Wordmark size={22} />
        </Link>

        {/* Desktop nav */}
        <nav className="nav-desktop" style={{ gap: 36, alignItems: 'center' }} aria-label="Primary navigation">
          {NAV.map(({ label, href }) => {
            const active = pathname === href || pathname.startsWith(href + '/');
            return (
              <Link
                key={href}
                href={href}
                style={navLinkStyle(active)}
                onMouseEnter={(e) => {
                  if (!active) (e.currentTarget as HTMLElement).style.borderBottomColor = 'var(--ottone-brunito)';
                }}
                onMouseLeave={(e) => {
                  if (!active) (e.currentTarget as HTMLElement).style.borderBottomColor = 'transparent';
                }}
              >
                {label}
              </Link>
            );
          })}
          <CartBadge />
        </nav>

        {/* Mobile menu toggle — text only, no icons */}
        <button
          className="nav-mobile"
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Chiudi menu' : 'Apri menu'}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            background: 'none',
            border: 0,
            cursor: 'pointer',
            color: 'var(--inchiostro)',
            padding: '4px 0',
            borderBottom: '1px solid transparent',
          }}
        >
          {menuOpen ? 'CHIUDI' : 'MENU'}
        </button>
      </header>

      {/* Mobile menu overlay */}
      <nav
        id="mobile-menu"
        className={`mobile-menu${menuOpen ? ' open' : ''}`}
        aria-label="Mobile navigation"
      >
        {NAV.map(({ label, href }) => {
          const active = pathname === href || pathname.startsWith(href + '/');
          return (
            <Link
              key={href}
              href={href}
              onClick={closeMenu}
              style={{
                fontFamily: 'var(--font-mono)',
                textTransform: 'uppercase',
                fontSize: 13,
                letterSpacing: '0.18em',
                color: 'var(--inchiostro)',
                textDecoration: 'none',
                padding: '20px 0',
                borderBottom: '1px solid rgba(20,20,20,0.08)',
                display: 'block',
                borderLeft: active ? '2px solid var(--ottone-brunito)' : '2px solid transparent',
                paddingLeft: active ? 16 : 0,
                transition: 'padding-left 120ms ease',
              }}
            >
              {label}
            </Link>
          );
        })}

        <div
          style={{
            padding: '20px 0',
            borderBottom: '1px solid rgba(20,20,20,0.08)',
          }}
          onClick={closeMenu}
        >
          <CartBadge />
        </div>
      </nav>
    </>
  );
}
