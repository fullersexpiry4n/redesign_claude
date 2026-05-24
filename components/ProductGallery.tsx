'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import LampSilhouette from './LampSilhouette';

type GalleryImage = { id: string; url: string };

type Props = {
  images: GalleryImage[];
  title: string;
  shadeTone: string;
};

const SWIPE_THRESHOLD = 50; // px

export default function ProductGallery({ images, title, shadeTone }: Props) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [mainLoaded, setMainLoaded] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const active = images[activeIdx] ?? images[0] ?? null;

  function goTo(idx: number) {
    if (idx === activeIdx) return;
    setMainLoaded(false);
    setActiveIdx(idx);
  }

  function next() {
    goTo((activeIdx + 1) % images.length);
  }

  function prev() {
    goTo((activeIdx - 1 + images.length) % images.length);
  }

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null || images.length < 2) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta > SWIPE_THRESHOLD) prev();
    else if (delta < -SWIPE_THRESHOLD) next();
    touchStartX.current = null;
  }

  return (
    <div style={{ minWidth: 0, width: '100%' }}>
      {/* Main image */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{
          width: '100%',
          aspectRatio: '1 / 1',
          background: 'var(--carta)',
          position: 'relative',
          overflow: 'hidden',
          touchAction: 'pan-y',
          userSelect: 'none',
        }}
      >
        {/* Shimmer shown until image loads */}
        {active && !mainLoaded && (
          <div className="image-shimmer" style={{ position: 'absolute', inset: 0, zIndex: 1 }} />
        )}
        {active ? (
          <Image
            src={active.url}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 55vw"
            style={{ objectFit: 'cover', opacity: mainLoaded ? 1 : 0, transition: 'opacity 300ms ease' }}
            priority
            unoptimized
            draggable={false}
            onLoad={() => setMainLoaded(true)}
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
              onClick={prev}
              aria-label="Previous image"
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
              onClick={next}
              aria-label="Next image"
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

            {/* Brass-dot pagination overlaid on the image — bottom-center */}
            <div
              role="tablist"
              aria-label="Image pagination"
              style={{
                position: 'absolute',
                bottom: 16,
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 3,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '6px 12px',
                background: 'rgba(255,255,255,0.55)',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
                borderRadius: 20,
              }}
            >
              {images.map((img, i) => {
                const isActive = i === activeIdx;
                return (
                  <button
                    key={img.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Image ${i + 1}`}
                    onClick={() => goTo(i)}
                    style={{
                      width: 24,
                      height: 24,
                      padding: 0,
                      border: 0,
                      background: 'transparent',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <span
                      style={{
                        display: 'inline-block',
                        width: isActive ? 9 : 6,
                        height: isActive ? 9 : 6,
                        borderRadius: '50%',
                        background: 'var(--ottone-brunito)',
                        opacity: isActive ? 1 : 0.4,
                        transition: 'opacity 160ms ease, width 160ms ease, height 160ms ease',
                      }}
                    />
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div
          style={{
            display: 'flex',
            gap: 8,
            marginTop: 12,
            overflowX: 'auto',
            paddingBottom: 2,
            width: '100%',
          }}
        >
          {images.map((img, i) => {
            const isActive = i === activeIdx;
            return (
              <button
                key={img.id}
                type="button"
                aria-label={`View image ${i + 1}`}
                onClick={() => goTo(i)}
                style={{
                  flexShrink: 0,
                  width: 72,
                  height: 72,
                  padding: 0,
                  border: `2px solid ${isActive ? 'var(--ottone-brunito)' : 'transparent'}`,
                  background: 'var(--carta)',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  opacity: isActive ? 1 : 0.6,
                  transition: 'opacity 160ms ease, border-color 160ms ease',
                }}
              >
                <Image
                  src={img.url}
                  alt={`${title} ${i + 1}`}
                  fill
                  sizes="72px"
                  style={{ objectFit: 'cover' }}
                  unoptimized
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
