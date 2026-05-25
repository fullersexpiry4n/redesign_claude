'use client';

import React, { useState } from 'react';
import MonoCaps from '@/components/atoms/MonoCaps';
import Button from '@/components/atoms/Button';
import DrawRule from '@/components/gsap/DrawRule';
import RevealOnScroll from '@/components/gsap/RevealOnScroll';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div style={{ padding: '80px var(--page-px) 120px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 56,
            fontWeight: 400,
            letterSpacing: '0.02em',
            margin: 0,
            lineHeight: 1,
          }}
        >
          <em>Contact</em>
        </h1>
        <MonoCaps opacity={0.6}>Visita · Condition Report · Enquire</MonoCaps>
      </div>

      <DrawRule width={80} style={{ margin: '24px 0 56px' }} />

      <div className="grid-2" style={{ alignItems: 'start' }}>
        {/* Form */}
        <RevealOnScroll>
          <MonoCaps size={11} opacity={0.6} as="div">§ Form</MonoCaps>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 28,
              fontWeight: 400,
              letterSpacing: '0.01em',
              margin: '12px 0 32px',
              maxWidth: '22ch',
              lineHeight: 1.2,
            }}
          >
            <em>Tell us</em> what you are looking for, or which piece you&#39;d like to see.
          </h2>

          {submitted ? (
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontSize: 18,
                  lineHeight: 1.5,
                  maxWidth: '36ch',
                }}
              >
                Thank you. We will respond within 48 hours.
              </div>
              <hr
                style={{
                  border: 0,
                  height: 1,
                  background: 'var(--ottone-brunito)',
                  width: 48,
                  margin: '20px 0',
                }}
              />
              <MonoCaps size={10} opacity={0.55}>We respond within 48 hours</MonoCaps>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              aria-label="Contact form"
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px 28px' }}
            >
              <div>
                <label htmlFor="contact-name" className="field-label">
                  Name <span aria-hidden="true">*</span>
                </label>
                <input
                  id="contact-name"
                  name="name"
                  className="field"
                  type="text"
                  placeholder="Your name…"
                  required
                  aria-required="true"
                  autoComplete="name"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="field-label">
                  Email <span aria-hidden="true">*</span>
                </label>
                <input
                  id="contact-email"
                  name="email"
                  className="field"
                  type="email"
                  placeholder="you@example.com…"
                  required
                  aria-required="true"
                  autoComplete="email"
                  inputMode="email"
                />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label htmlFor="contact-piece" className="field-label">
                  Piece of interest (optional)
                </label>
                <input
                  id="contact-piece"
                  name="piece"
                  className="field"
                  type="text"
                  placeholder="№ 0142, or describe what you are looking for…"
                  autoComplete="off"
                />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label htmlFor="contact-message" className="field-label">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  className="field"
                  rows={4}
                  placeholder="A note to the dealer, not a checkout…"
                  style={{ resize: 'none' }}
                />
              </div>
              <div
                style={{
                  gridColumn: '1 / -1',
                  display: 'flex',
                  gap: 20,
                  alignItems: 'center',
                  marginTop: 12,
                }}
              >
                <Button type="submit" variant="primary">
                  SEND ENQUIRY
                </Button>
                <MonoCaps size={10} opacity={0.55}>
                  We respond within 48 hours
                </MonoCaps>
              </div>
            </form>
          )}
        </RevealOnScroll>

        {/* Address */}
        <RevealOnScroll delay={0.1}>
          <MonoCaps size={11} opacity={0.6} as="div">§ Showroom</MonoCaps>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 28,
              fontWeight: 400,
              letterSpacing: '0.01em',
              margin: '12px 0 24px',
              lineHeight: 1.2,
            }}
          >
            <em>Brera</em>, by appointment.
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 14,
              lineHeight: 1.7,
              maxWidth: '46ch',
            }}
          >
            Each piece in the catalogue is photographed where it sits. Visiting in person
            is the only way to assess condition, to read patina, to see the lamp doing its
            job.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '110px 1fr',
              gap: '14px 24px',
              marginTop: 32,
            }}
          >
            {[
              ['Address', 'Via dell\'Orso 12\n20121 Milano · Italy'],
              ['Hours', 'Tue — Sat\n11:00 — 18:00 · by appointment'],
              ['Email', 'visita@redesign.shop'],
              ['Phone', '+39 02 8242 0000'],
              ['VAT', 'IT 01234567890'],
            ].map(([label, value]) => (
              <React.Fragment key={label}>
                <MonoCaps size={10} opacity={0.55} as="div">{label}</MonoCaps>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 13,
                    letterSpacing: '0.02em',
                    whiteSpace: 'pre-line',
                    lineHeight: 1.6,
                  }}
                >
                  {label === 'Email' ? (
                    <a
                      href="mailto:visita@redesign.shop"
                      style={{
                        color: 'var(--ottone-brunito)',
                        borderBottom: '1px solid var(--ottone-brunito)',
                      }}
                    >
                      {value}
                    </a>
                  ) : (
                    value
                  )}
                </div>
              </React.Fragment>
            ))}
          </div>

          <hr
            style={{
              border: 0,
              height: 1,
              background: 'var(--ottone-brunito)',
              width: 48,
              margin: '32px 0 20px',
            }}
          />
          <MonoCaps size={11} opacity={0.6} as="div" style={{ marginBottom: 6 }}>
            § Dealers &amp; Architects
          </MonoCaps>
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontSize: 15,
              lineHeight: 1.55,
              maxWidth: '40ch',
            }}
          >
            We sell to private collectors, designers, and dealers. Trade enquiries:{' '}
            <a
              href="mailto:trade@redesign.shop"
              style={{
                color: 'var(--ottone-brunito)',
                borderBottom: '1px solid var(--ottone-brunito)',
                fontStyle: 'normal',
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                letterSpacing: '0.04em',
              }}
            >
              trade@redesign.shop
            </a>
          </p>
        </RevealOnScroll>
      </div>
    </div>
  );
}
