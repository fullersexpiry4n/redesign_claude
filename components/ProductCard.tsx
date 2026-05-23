import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Piece } from '@/data/pieces';
import LampSilhouette from './LampSilhouette';
import LotMark from './atoms/LotMark';

type ProductCardProps = {
  piece: Piece;
  imageUrl?: string;
};

export default function ProductCard({ piece, imageUrl }: ProductCardProps) {
  return (
    <Link
      href={`/catalogue/${piece.lot}`}
      style={{ textDecoration: 'none', color: 'inherit', border: 0, display: 'flex', flexDirection: 'column', gap: 16 }}
    >
      {/* Photo area */}
      <div
        style={{
          width: '100%',
          aspectRatio: '1 / 1',
          background: 'var(--carta)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          position: 'relative',
          transition: 'opacity 120ms ease',
        }}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={piece.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
            unoptimized
          />
        ) : (
          <LampSilhouette tone={piece.shadeTone} scale={1.3} />
        )}
      </div>

      {/* Metadata */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <LotMark n={piece.lot} label={piece.type} level="sm" />

        <div
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 22,
            lineHeight: 1.15,
            letterSpacing: '0.01em',
            fontStyle: 'italic',
          }}
        >
          {piece.title}
        </div>

        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            opacity: 0.8,
          }}
        >
          {piece.maison} · {piece.year}
        </div>

        {/* Brass rule — the product card's only chrome */}
        <hr
          style={{
            border: 0,
            height: 1,
            background: 'var(--ottone-brunito)',
            width: 32,
            margin: '8px 0',
          }}
        />

        <div
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 20,
            letterSpacing: '0.01em',
          }}
        >
          € {piece.price.toLocaleString('en-GB')}
        </div>
      </div>
    </Link>
  );
}
