'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type RevealOnScrollProps = {
  children: React.ReactNode;
  stagger?: number;
  y?: number;
  duration?: number;
  delay?: number;
  style?: React.CSSProperties;
  className?: string;
  as?: React.ElementType;
};

export default function RevealOnScroll({
  children,
  stagger = 0,
  y = 16,
  duration = 0.55,
  delay = 0,
  style,
  className,
  as: Tag = 'div',
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const targets = stagger > 0 ? Array.from(el.children) : [el];
    gsap.set(targets, { opacity: 0, y });

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        once: true,
        onEnter: () => {
          gsap.to(targets, {
            opacity: 1,
            y: 0,
            duration,
            stagger,
            delay,
            ease: 'power2.out',
          });
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <Tag ref={ref} style={style} className={className}>
      {children}
    </Tag>
  );
}
