import React from 'react';

type LotMarkProps = {
  n: string;
  label?: string;
  level?: 'sm' | 'med' | 'lg';
  style?: React.CSSProperties;
};

const sizes = { sm: 11, med: 13, lg: 18 };

export default function LotMark({ n, label, level = 'med', style }: LotMarkProps) {
  return (
    <div
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: sizes[level],
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        ...style,
      }}
    >
      <span style={{ color: 'var(--ottone-brunito)' }}>№</span>{' '}
      {n}{label ? ` · ${label}` : ''}
    </div>
  );
}
