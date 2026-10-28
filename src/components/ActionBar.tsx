import { useGameStore } from '../store';

export function ActionBar() {
  const setOverlay = useGameStore((s) => s.setOverlay);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '90px',
        left: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-sm)',
        zIndex: 10,
      }}
    >
      <button
        onClick={() => setOverlay('notebook')}
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: 'rgba(20, 20, 31, 0.8)',
          border: '2px solid var(--color-border)',
          color: 'var(--color-text)',
          fontSize: '1.2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
          cursor: 'pointer',
        }}
        aria-label="Блокнот"
        title="Блокнот"
      >
        📓
      </button>
      <button
        onClick={() => setOverlay('character_map')}
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: 'rgba(20, 20, 31, 0.8)',
          border: '2px solid var(--color-border)',
          color: 'var(--color-text)',
          fontSize: '1.2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
          cursor: 'pointer',
        }}
        aria-label="Схема связей"
        title="Схема связей"
      >
        🔗
      </button>
    </div>
  );
}
