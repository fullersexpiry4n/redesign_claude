'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import LampSilhouette from './LampSilhouette';
import DrawRule from './gsap/DrawRule';

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const ruleRef = useRef<HTMLHRElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const lines = el.querySelectorAll('[data-reveal-line]');
    const ctaBlock = el.querySelector('[data-reveal-cta]');
    const photoBlock = el.querySelector('[data-reveal-photo]');

    const targets = [...Array.from(lines), ctaBlock, photoBlock].filter(Boolean);
    gsap.set(targets, { opacity: 0, y: 20 });

    const tl = gsap.timeline({ delay: 0.05 });
    tl.to(Array.from(lines), {
      opacity: 1,
      y: 0,
      duration: 0.55,
      stagger: 0.08,
      ease: 'power2.out',
    });

    if (ruleRef.current) {
      gsap.set(ruleRef.current, { scaleX: 0, transformOrigin: 'left center' });
      tl.to(
        ruleRef.current,
        { scaleX: 1, duration: 0.5, ease: 'power2.out' },
        '-=0.25'
      );
    }

    if (ctaBlock) {
      tl.to(ctaBlock, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }, '-=0.2');
    }
    if (photoBlock) {
      tl.to(photoBlock, { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out' }, '<-0.3');
    }

    return () => { tl.kill(); };
  }, []);

  return (
    <section
      ref={heroRef}
      className="grid-hero"
    >
      <div>
        <div data-reveal-line>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              opacity: 0.6,
            }}
          >
            № 001 · Milano · MMXXVI
          </span>
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontWeight: 400,
            fontSize: 'clamp(56px, 7vw, 96px)',
            lineHeight: 1.0,
            letterSpacing: '0.02em',
            margin: '20px 0 0',
            maxWidth: '14ch',
          }}
        >
          <span data-reveal-line style={{ display: 'block' }}>
            <em>Italian lighting,</em>
          </span>
          <span data-reveal-line style={{ display: 'block' }}>
            returned.
          </span>
        </h1>

        <hr
          ref={ruleRef}
          style={{
            border: 0,
            height: 1,
            background: 'var(--ottone-brunito)',
            width: 80,
            margin: '28px 0',
          }}
        />

        <p
          data-reveal-line
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 17,
            lineHeight: 1.65,
            maxWidth: '52ch',
            margin: '0 0 36px',
          }}
        >
          A private dealer of authored Italian lighting from the late post-war period
          through the early radical years and beyond. Documented pieces by{' '}
          <span className="maison">Stilnovo</span>,{' '}
          <span className="maison">Arteluce</span>,{' '}
          <span className="maison">Arredoluce</span>,{' '}
          <span className="maison">Flos</span>,{' '}
          <span className="maison">O‑Luce</span>. We do not list pieces we have not handled.
        </p>

        <div
          data-reveal-cta
          style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}
        >
          <Link
            href="/catalogue"
            style={{
              fontFamily: 'var(--font-mono)',
              textTransform: 'uppercase',
              letterSpacing: '0.16em',
              fontSize: 11,
              background: 'var(--inchiostro)',
              color: 'var(--avorio)',
              padding: '16px 28px',
              textDecoration: 'none',
              border: 0,
              transition: 'background 120ms ease',
              display: 'inline-block',
              lineHeight: 1,
            }}
          >
            VIEW CATALOGUE
          </Link>
          <Link
            href="/visita"
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontSize: 15,
              color: 'var(--ottone-brunito)',
              borderBottom: '1px solid var(--ottone-brunito)',
              paddingBottom: 2,
              textDecoration: 'none',
              transition: 'border-color 120ms ease',
            }}
          >
            Book an appointment →
          </Link>
        </div>
      </div>

      {/* Hero lamp — Carta background, hidden on mobile via grid-hero-photo class */}
      <div
        data-reveal-photo
        className="grid-hero-photo"
        style={{
          background: 'var(--carta)',
          aspectRatio: '4 / 5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <LampSilhouette tone="#E8E1D2" scale={2.2} />
      </div>
    </section>
  );
}
