'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import LampSilhouette from './LampSilhouette';

type GalleryImage = { id: string; url: string };

type Props = {
  images: GalleryImage[];
  title: string;
  shadeTone: string;
};

export default function ProductGallery({ images, title, shadeTone }: Props) {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = images[activeIdx] ?? images[0] ?? null;

  return (
    <div>
      {/* Main image */}
      <div
        style={{
          width: '100%',
          aspectRatio: '1 / 1',
          background: 'var(--carta)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {active ? (
          <Image
            src={active.url}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 55vw"
            style={{ objectFit: 'cover' }}
            priority
          />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <LampSilhouette tone={shadeTone} scale={2.2} />
          </div>
        )}

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => setActiveIdx((activeIdx - 1 + images.length) % images.length)}
              aria-label="Vorige afbeelding"
              style={{
                position: 'absolute',
                left: 12,
                top: '50%',
                transform: 'translateY(-50%)',
                width: 40,
                height: 40,
                background: 'rgba(255,255,255,0.82)',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)',
                zIndex: 2,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M11 4L6 9l5 5" stroke="var(--inchiostro)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              type="button"
              onClick={() => setActiveIdx((activeIdx + 1) % images.length)}
              aria-label="Volgende afbeelding"
              style={{
                position: 'absolute',
                right: 12,
                top: '50%',
                transform: 'translateY(-50%)',
                width: 40,
                height: 40,
                background: 'rgba(255,255,255,0.82)',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)',
                zIndex: 2,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M7 4l5 5-5 5" stroke="var(--inchiostro)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div
          style={{
            display: 'flex',
            gap: 6,
            marginTop: 8,
            flexWrap: 'wrap',
          }}
        >
          {images.map((img, i) => (
            <button
              key={img.id}
              type="button"
              onClick={() => setActiveIdx(i)}
              style={{
                width: 72,
                height: 72,
                padding: 0,
                border: 0,
                outline: i === activeIdx
                  ? '2px solid var(--inchiostro)'
                  : '1px solid rgba(20,20,20,0.12)',
                cursor: 'pointer',
                background: 'var(--carta)',
                position: 'relative',
                overflow: 'hidden',
                flexShrink: 0,
                transition: 'outline 80ms ease',
              }}
            >
              <Image
                src={img.url}
                alt={`${title} ${i + 1}`}
                fill
                sizes="72px"
                style={{ objectFit: 'cover' }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
