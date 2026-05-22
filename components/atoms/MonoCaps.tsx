import React from 'react';

type MonoCapsProps = {
  children: React.ReactNode;
  size?: number;
  opacity?: number;
  style?: React.CSSProperties;
  className?: string;
  as?: React.ElementType;
};

export default function MonoCaps({
  children,
  size = 11,
  opacity = 1,
  style,
  className,
  as: Tag = 'span',
}: MonoCapsProps) {
  return (
    <Tag
      className={className}
      style={{
        fontFamily: 'var(--font-mono)',
        textTransform: 'uppercase' as const,
        fontSize: size,
        letterSpacing: '0.16em',
        opacity,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}
