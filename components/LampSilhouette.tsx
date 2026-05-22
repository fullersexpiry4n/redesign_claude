import React from 'react';

type LampSilhouetteProps = {
  tone?: string;
  scale?: number;
};

export default function LampSilhouette({ tone = '#E8E1D2', scale = 1 }: LampSilhouetteProps) {
  return (
    <div
      style={{
        width: 90 * scale,
        height: 180 * scale,
        position: 'relative',
        flexShrink: 0,
      }}
    >
      {/* Shade */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 80 * scale,
          height: 40 * scale,
          borderRadius: `${50 * scale}% ${50 * scale}% ${8 * scale}px ${8 * scale}px / ${100 * scale}% ${100 * scale}% ${8 * scale}px ${8 * scale}px`,
          background: tone,
          boxShadow: `inset 0 ${-10 * scale}px ${14 * scale}px rgba(20,20,20,0.12)`,
        }}
      />
      {/* Stem — brass */}
      <div
        style={{
          position: 'absolute',
          top: 40 * scale,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 4 * scale,
          height: 116 * scale,
          background: '#9B7B3D',
        }}
      />
      {/* Base */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 60 * scale,
          height: 16 * scale,
          background: '#2a2a28',
        }}
      />
    </div>
  );
}
