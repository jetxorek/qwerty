import type { Scene } from '../schemas/scene';
import { BACKGROUND_ASSETS } from '../assets';

interface SceneIntroProps {
  scene: Scene;
  onStart: () => void;
}

export function SceneIntro({ scene, onStart }: SceneIntroProps) {
  const bgImage = BACKGROUND_ASSETS[scene.background];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '80vh', backgroundColor: 'var(--color-bg)' }}>
      {bgImage && (
        <div style={{ position: 'relative', width: '100%', height: '250px' }}>
          <img src={bgImage} alt={scene.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '100px', background: 'linear-gradient(to bottom, transparent, var(--color-bg))' }} />
        </div>
      )}
      
      <div style={{ padding: 'var(--spacing-lg)', textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h1 style={{ color: 'var(--color-accent)', marginBottom: 'var(--spacing-md)' }}>
          {scene.title}
        </h1>
        <p style={{ color: 'var(--color-text)', lineHeight: 1.6, fontStyle: 'italic', marginBottom: 'var(--spacing-lg)' }}>
          {scene.intro}
        </p>
        <button
          onClick={onStart}
          style={{
            alignSelf: 'center',
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
    </div>
  );
}
