import { useGameStore } from '../store';

export function SceneScreen() {
  const setScreen = useGameStore((s) => s.setScreen);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        padding: 'var(--spacing-lg)',
        background: 'var(--color-bg)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-xl)' }}>
        <button
          onClick={() => setScreen('main_menu')}
          style={{
            background: 'transparent',
            border: '1px solid var(--color-border)',
            color: 'var(--color-text)',
            padding: 'var(--spacing-sm) var(--spacing-md)',
            borderRadius: 'var(--radius-md)',
            fontSize: 'var(--font-size-md)',
          }}
        >
          ← Назад
        </button>
        <h1 style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-main)', fontSize: 'var(--font-size-xl)', margin: 0 }}>
          🚢 Палуба «Карнака»
        </h1>
      </div>

      <div style={{ maxWidth: '500px', margin: '0 auto', width: '100%' }}>
        <div
          style={{
            padding: 'var(--spacing-xl)',
            background: 'var(--color-bg-panel)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-border)',
            textAlign: 'center',
          }}
        >
          <p style={{ color: 'var(--color-text)', margin: '0 0 var(--spacing-md)', fontFamily: 'var(--font-main)', fontSize: 'var(--font-size-lg)' }}>
            «Лунный свет скользил по палубе парохода...»
          </p>
          <p style={{ color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.6 }}>
            Основная сцена расследования будет реализована в следующих этапах разработки.
          </p>
        </div>
      </div>
    </div>
  );
}
