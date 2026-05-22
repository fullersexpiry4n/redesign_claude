import React from 'react';

type WordmarkProps = {
  size?: number;
  showTagline?: boolean;
  color?: string;
};

export default function Wordmark({ size = 32, showTagline = false, color = 'var(--inchiostro)' }: WordmarkProps) {
  const dotSize = size * 0.34;

  return (
    <div
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: size * 0.2,
        lineHeight: 1,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: size * 0.45,
          lineHeight: 1,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: size,
            fontWeight: 400,
            letterSpacing: '0.04em',
            color,
            lineHeight: 1,
          }}
        >
          RE
        </span>
        {/* Brass dot interpunct — the brand's most distinctive mark */}
        <span
          style={{
            display: 'inline-block',
            width: dotSize,
            height: dotSize,
            borderRadius: '50%',
            background: 'var(--ottone-brunito)',
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: size,
            fontWeight: 400,
            letterSpacing: '0.04em',
            color,
            lineHeight: 1,
          }}
        >
          DESIGN
        </span>
      </div>
      {showTagline && (
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: size * 0.22,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color,
            opacity: 0.65,
          }}
        >
          Italian Design Lighting · 1960 — 2000
        </span>
      )}
    </div>
  );
}
