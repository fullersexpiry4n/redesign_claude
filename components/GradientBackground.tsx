export default function GradientBackground() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none',
        background: 'linear-gradient(160deg, #F4EFE6 0%, #D8CFC0 100%)',
      }}
    />
  );
}
