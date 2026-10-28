import { useGameStore } from '../store';

interface AppHeaderProps {
  title?: string;
  showBack?: boolean;
  rightContent?: React.ReactNode;
}

export function AppHeader({ title, showBack = false, rightContent }: AppHeaderProps) {
  const setScreen = useGameStore((s) => s.setScreen);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 'var(--spacing-md)',
        borderBottom: '1px solid var(--color-border)',
        background: 'rgba(10, 10, 15, 0.8)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
        {showBack && (
          <button
            onClick={() => setScreen('main_menu')}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--color-accent)',
              fontSize: '1rem',
              cursor: 'pointer',
              padding: 'var(--spacing-sm)',
            }}
          >
            ← Назад
          </button>
        )}
        {title && (
          <h1
            style={{
              margin: 0,
              color: 'var(--color-accent)',
              fontFamily: 'var(--font-main)',
              fontSize: 'var(--font-size-lg)',
            }}
          >
            {title}
          </h1>
        )}
      </div>

      {rightContent && <div>{rightContent}</div>}
    </div>
  );
}
