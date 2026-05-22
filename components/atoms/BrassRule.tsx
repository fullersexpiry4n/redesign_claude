import React from 'react';

type BrassRuleProps = {
  width?: number | string;
  full?: boolean;
  short?: boolean;
  style?: React.CSSProperties;
  className?: string;
};

export default function BrassRule({ width, full, short, style, className }: BrassRuleProps) {
  const w = full ? '100%' : short ? 48 : (width ?? 80);
  return (
    <hr
      className={className}
      style={{
        border: 0,
        height: 1,
        background: 'var(--ottone-brunito)',
        width: w,
        margin: '20px 0',
        ...style,
      }}
    />
  );
}
