import { useGameStore } from '../../store';
import { getCharacterById } from '../../data/characters';

export function CharacterCardOverlay() {
  const activeSpeaker = useGameStore((s) => s.activeSpeaker);
  const setOverlay = useGameStore((s) => s.setOverlay);

  const character = activeSpeaker ? getCharacterById(activeSpeaker) : null;

  if (!character) return null;

  const handleClose = () => {
    setOverlay('none');
  };

  const roleLabels: Record<string, string> = {
    detective: '🔍 Детектив',
    suspect: '🎭 Подозреваемый',
    victim: '💀 Жертва',
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50,
        padding: 'var(--spacing-lg)',
        backdropFilter: 'blur(4px)',
      }}
      onClick={handleClose}
    >
      <div
        style={{
          background: 'var(--color-bg-panel)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--spacing-xl)',
          maxWidth: '400px',
          width: '100%',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Заголовок */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: 'var(--spacing-lg)',
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
                color: 'var(--color-accent)',
                fontFamily: 'var(--font-main)',
                fontSize: 'var(--font-size-xl)',
              }}
            >
              {character.name}
            </h2>
            <p
              style={{
                margin: '4px 0 0',
                color: 'var(--color-text-muted)',
                fontSize: 'var(--font-size-sm)',
              }}
            >
              {character.visibleFacts.occupation}
            </p>
          </div>
          <button
            onClick={handleClose}
            style={{
              background: 'transparent',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text-muted)',
              borderRadius: 'var(--radius-sm)',
              padding: 'var(--spacing-xs) var(--spacing-sm)',
              fontSize: 'var(--font-size-sm)',
            }}
          >
            ✕
          </button>
        </div>

        {/* Факты */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--spacing-md)',
          }}
        >
          <div
            style={{
              padding: 'var(--spacing-md)',
              background: 'var(--color-bg-elevated)',
              borderRadius: 'var(--radius-md)',
            }}
          >
            <span
              style={{
                color: 'var(--color-text-muted)',
                fontSize: 'var(--font-size-xs)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              Возраст
            </span>
            <p
              style={{
                margin: '4px 0 0',
                color: 'var(--color-text)',
                fontSize: 'var(--font-size-lg)',
                fontWeight: 'bold',
              }}
            >
              {character.visibleFacts.age} лет
            </p>
          </div>

          <div
            style={{
              padding: 'var(--spacing-md)',
              background: 'var(--color-bg-elevated)',
              borderRadius: 'var(--radius-md)',
            }}
          >
            <span
              style={{
                color: 'var(--color-text-muted)',
                fontSize: 'var(--font-size-xs)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              Роль
            </span>
            <p
              style={{
                margin: '4px 0 0',
                color: 'var(--color-text)',
                fontSize: 'var(--font-size-md)',
              }}
            >
              {roleLabels[character.role]}
            </p>
          </div>

          <div
            style={{
              padding: 'var(--spacing-md)',
              background: 'var(--color-bg-elevated)',
              borderRadius: 'var(--radius-md)',
            }}
          >
            <span
              style={{
                color: 'var(--color-text-muted)',
                fontSize: 'var(--font-size-xs)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              Первое впечатление
            </span>
            <p
              style={{
                margin: '4px 0 0',
                color: 'var(--color-text)',
                fontSize: 'var(--font-size-sm)',
                lineHeight: 1.5,
                fontStyle: 'italic',
              }}
            >
              «{character.visibleFacts.firstImpression}»
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
