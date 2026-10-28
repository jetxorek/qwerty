import { useEffect, useState } from 'react';
import { ACHIEVEMENTS } from '../../data/achievements';
import { loadDailyProgress } from '../../storage/dailyProgress';
import type { DailyProgress } from '../../schemas/achievement';

interface AchievementsOverlayProps {
  onClose: () => void;
}

export function AchievementsOverlay({ onClose }: AchievementsOverlayProps) {
  const [progress, setProgress] = useState<DailyProgress | null>(null);

  useEffect(() => {
    setProgress(loadDailyProgress());
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--spacing-md)',
        zIndex: 1000,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--color-bg-panel)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--spacing-lg)',
          maxWidth: '600px',
          width: '100%',
          maxHeight: '80vh',
          overflowY: 'auto',
          color: 'var(--color-text)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 'var(--spacing-md)',
          }}
        >
          <h2 style={{ margin: 0 }}>Ачивки</h2>
          <button
            onClick={onClose}
            aria-label="Закрыть"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--color-text)',
              fontSize: '1.5rem',
              cursor: 'pointer',
            }}
          >
            ×
          </button>
        </div>

        {progress && (
          <div
            style={{
              background: 'var(--color-bg)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--spacing-md)',
              marginBottom: 'var(--spacing-lg)',
              textAlign: 'center',
            }}
          >
            <p style={{ margin: 0, color: 'var(--color-text-muted)' }}>Дедукция</p>
            <p style={{ margin: 0, fontSize: '2rem', fontWeight: 700 }}>{progress.score}</p>
          </div>
        )}

        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--spacing-sm)',
          }}
        >
          {ACHIEVEMENTS.map((a) => {
            const unlocked = progress?.unlockedAchievements.includes(a.id) ?? false;
            return (
              <li
                key={a.id}
                style={{
                  padding: 'var(--spacing-md)',
                  background: unlocked ? 'var(--color-bg)' : 'var(--color-bg-panel)',
                  border: unlocked
                    ? '1px solid var(--color-accent)'
                    : '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  opacity: unlocked ? 1 : 0.6,
                }}
              >
                <div style={{ display: 'flex', gap: 'var(--spacing-sm)', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.5rem' }} aria-hidden="true">
                    {unlocked ? a.icon : '🔒'}
                  </span>
                  <div>
                    <p style={{ margin: 0, fontWeight: 600 }}>{a.title}</p>
                    <p
                      style={{
                        margin: 0,
                        fontSize: '0.875rem',
                        color: 'var(--color-text-muted)',
                      }}
                    >
                      {a.description}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
