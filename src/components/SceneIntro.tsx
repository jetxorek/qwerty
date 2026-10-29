import type { Scene } from '../schemas/scene';

interface SceneIntroProps {
  scene: Scene;
  onStart: () => void;
}

export function SceneIntro({ scene, onStart }: SceneIntroProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh',
        padding: 'var(--spacing-lg)',
        textAlign: 'center',
        backgroundColor: 'var(--color-bg)',
      }}
    >
      <h1 style={{ color: 'var(--color-accent)', marginBottom: 'var(--spacing-md)' }}>
        {scene.title}
      </h1>
      <p style={{ color: 'var(--color-text)', lineHeight: 1.6, fontStyle: 'italic', marginBottom: 'var(--spacing-lg)' }}>
        {scene.intro}
      </p>
      <button
        onClick={onStart}
        style={{
          padding: 'var(--spacing-md) var(--spacing-lg)',
          background: 'var(--color-accent)',
          color: 'var(--color-bg)',
          border: 'none',
          borderRadius: 'var(--radius-md)',
          fontSize: '1rem',
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
      >
        Начать
      </button>
    </div>
  );
}
