'use client';

import React, { useState } from 'react';
import Link from 'next/link';

type Result = {
  processed: number;
  remaining: number;
  errors: { id: string; message: string }[];
  done: boolean;
};

export default function ReprocessPage() {
  const [running, setRunning] = useState(false);
  const [totalProcessed, setTotalProcessed] = useState(0);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [errors, setErrors] = useState<{ id: string; message: string }[]>([]);
  const [done, setDone] = useState(false);
  const [log, setLog] = useState<string[]>([]);

  function append(line: string) {
    setLog((prev) => [...prev, `${new Date().toLocaleTimeString()} · ${line}`]);
  }

  async function run() {
    setRunning(true);
    setDone(false);
    setErrors([]);
    setTotalProcessed(0);
    setLog([]);
    append('Starting reprocess loop…');

    while (true) {
      try {
        const res = await fetch('/api/admin/reprocess-images', { method: 'POST' });
        if (!res.ok) {
          append(`HTTP ${res.status} — aborting`);
          break;
        }
        const data: Result = await res.json();
        setTotalProcessed((t) => t + data.processed);
        setRemaining(data.remaining);
        if (data.errors.length > 0) {
          setErrors((prev) => [...prev, ...data.errors]);
          append(`Batch: processed ${data.processed}, ${data.errors.length} errors`);
        } else {
          append(`Batch: processed ${data.processed}, ${data.remaining} remaining`);
        }
        if (data.done || data.processed === 0) {
          setDone(true);
          append('All images reprocessed ✓');
          break;
        }
      } catch (err) {
        append(`Network error: ${err instanceof Error ? err.message : String(err)}`);
        break;
      }
    }

    setRunning(false);
  }

  return (
    <div style={{ padding: '48px var(--page-px) 96px', maxWidth: 760 }}>
      <Link
        href="/admin"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: '0.14em',
          color: 'var(--fg-muted)',
          textDecoration: 'none',
          display: 'inline-block',
          marginBottom: 32,
        }}
      >
        ← Dashboard
      </Link>

      <h1
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 32,
          fontWeight: 400,
          fontStyle: 'italic',
          margin: '0 0 8px',
        }}
      >
        Reprocess legacy images
      </h1>

      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 14,
          lineHeight: 1.7,
          maxWidth: '56ch',
          opacity: 0.8,
          margin: '12px 0 32px',
        }}
      >
        Downloads each legacy product image, resizes to 1600 px, converts to WebP, and
        re-uploads. Run once after the image pipeline upgrade. Safe to re-run — only
        non-WebP images are picked up.
      </p>

      <hr
        style={{
          border: 0,
          height: 1,
          background: 'var(--ottone-brunito)',
          width: 48,
          margin: '0 0 32px',
        }}
      />

      <button
        type="button"
        onClick={run}
        disabled={running}
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: '0.16em',
          padding: '14px 28px',
          background: running ? 'var(--fg-muted)' : 'var(--inchiostro)',
          color: 'var(--avorio)',
          border: 0,
          cursor: running ? 'not-allowed' : 'pointer',
          lineHeight: 1,
          marginBottom: 32,
        }}
      >
        {running ? 'Reprocessing…' : done ? 'Run again' : 'Start reprocess'}
      </button>

      {/* Status */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 16,
          marginBottom: 32,
        }}
      >
        {[
          { label: 'Processed', value: totalProcessed },
          { label: 'Remaining', value: remaining ?? '—' },
          { label: 'Errors', value: errors.length },
        ].map(({ label, value }) => (
          <div key={label} style={{ border: '1px solid rgba(20,20,20,0.12)', padding: '16px 20px' }}>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                textTransform: 'uppercase',
                letterSpacing: '0.16em',
                opacity: 0.55,
                marginBottom: 6,
              }}
            >
              {label}
            </div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 28 }}>{value}</div>
          </div>
        ))}
      </div>

      {/* Log */}
      {log.length > 0 && (
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            lineHeight: 1.7,
            background: 'rgba(20,20,20,0.04)',
            border: '1px solid rgba(20,20,20,0.08)',
            padding: 16,
            maxHeight: 320,
            overflow: 'auto',
            marginBottom: 24,
          }}
        >
          {log.map((line, i) => (
            <div key={i} style={{ opacity: i === log.length - 1 ? 1 : 0.7 }}>
              {line}
            </div>
          ))}
        </div>
      )}

      {/* Errors */}
      {errors.length > 0 && (
        <div
          role="alert"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: '#8B1A1A',
            border: '1px solid #8B1A1A',
            padding: '12px 16px',
            letterSpacing: '0.04em',
            lineHeight: 1.6,
          }}
        >
          <div style={{ marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
            {errors.length} error{errors.length === 1 ? '' : 's'}
          </div>
          {errors.slice(0, 10).map((e, i) => (
            <div key={i}>
              {e.id.slice(0, 8)} — {e.message}
            </div>
          ))}
          {errors.length > 10 && <div>…and {errors.length - 10} more</div>}
        </div>
      )}
    </div>
  );
}
