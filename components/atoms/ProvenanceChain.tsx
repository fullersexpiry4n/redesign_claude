import React from 'react';
import { ProvenanceStop } from '@/data/pieces';

type ProvenanceChainProps = {
  stops: ProvenanceStop[];
};

export default function ProvenanceChain({ stops }: ProvenanceChainProps) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, alignItems: 'center' }}>
      {stops.map((stop, i) => (
        <React.Fragment key={i}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              opacity: stop.unknown ? 0.6 : 1,
            }}
          >
            {stop.label}
          </span>
          {i < stops.length - 1 && (
            <span
              style={{
                color: 'var(--ottone-brunito)',
                fontFamily: 'var(--font-mono)',
                fontSize: 16,
                lineHeight: 1,
              }}
            >
              →
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
