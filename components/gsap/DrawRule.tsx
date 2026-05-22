'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type DrawRuleProps = {
  width?: number | string;
  style?: React.CSSProperties;
};

export default function DrawRule({ width = 80, style }: DrawRuleProps) {
  const ref = useRef<HTMLHRElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    gsap.set(el, { scaleX: 0, transformOrigin: 'left center' });

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 92%',
        once: true,
        onEnter: () => {
          gsap.to(el, {
            scaleX: 1,
            duration: 0.55,
            ease: 'power2.out',
          });
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <hr
      ref={ref}
      style={{
        border: 0,
        height: 1,
        background: 'var(--ottone-brunito)',
        width,
        margin: '20px 0',
        ...style,
      }}
    />
  );
}
