'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type RevealConfig = {
  y?: number;
  duration?: number;
  stagger?: number;
  delay?: number;
  ease?: string;
  once?: boolean;
};

export function useReveal<T extends HTMLElement>(
  config: RevealConfig = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const {
      y = 16,
      duration = 0.55,
      stagger = 0,
      delay = 0,
      ease = 'power2.out',
      once = true,
    } = config;

    const targets = stagger > 0 ? Array.from(el.children) : [el];

    gsap.set(targets, { opacity: 0, y });

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        once,
        onEnter: () => {
          gsap.to(targets, {
            opacity: 1,
            y: 0,
            duration,
            stagger,
            delay,
            ease,
          });
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return ref;
}

export function useDrawRule<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.set(el, { scaleX: 0, transformOrigin: 'left center' });

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 92%',
        once: true,
        onEnter: () => {
          gsap.to(el, {
            scaleX: 1,
            duration: 0.6,
            ease: 'power2.out',
          });
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return ref;
}

export function useHeroReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const lines = Array.from(el.querySelectorAll('[data-reveal-line]'));
    if (lines.length === 0) return;

    gsap.set(lines, { opacity: 0, y: 22 });

    const tl = gsap.timeline({ delay: 0.1 });
    tl.to(lines, {
      opacity: 1,
      y: 0,
      duration: 0.55,
      stagger: 0.09,
      ease: 'power2.out',
    });

    return () => { tl.kill(); };
  }, []);

  return ref;
}
