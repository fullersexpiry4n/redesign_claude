'use client';

import React from 'react';

type ButtonVariant = 'primary' | 'ghost' | 'brass';

type ButtonProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  onClick?: () => void;
  style?: React.CSSProperties;
  type?: 'button' | 'submit' | 'reset';
  href?: string;
};

export default function Button({
  children,
  variant = 'primary',
  onClick,
  style,
  type = 'button',
  href,
}: ButtonProps) {
  const base: React.CSSProperties = {
    fontFamily: 'var(--font-mono)',
    textTransform: 'uppercase',
    letterSpacing: '0.16em',
    fontSize: 11,
    cursor: 'pointer',
    display: 'inline-block',
    lineHeight: 1,
    transition: 'background 120ms ease, border-color 120ms ease, color 120ms ease',
    textDecoration: 'none',
    border: 0,
  };

  const variants: Record<ButtonVariant, React.CSSProperties> = {
    primary: {
      background: 'var(--inchiostro)',
      color: 'var(--avorio)',
      padding: '16px 28px',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--inchiostro)',
      border: '1px solid var(--inchiostro)',
      padding: '15px 27px',
    },
    brass: {
      background: 'transparent',
      color: 'var(--ottone-brunito)',
      borderBottom: '1px solid var(--ottone-brunito)',
      padding: '0 0 3px',
      fontSize: 14,
      fontFamily: 'var(--font-serif)',
      fontStyle: 'italic',
      letterSpacing: '0.02em',
      textTransform: 'none',
    },
  };

  const merged = { ...base, ...variants[variant], ...style };

  if (href) {
    return (
      <a href={href} style={merged}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} style={merged}>
      {children}
    </button>
  );
}
