import { CHARACTERS } from '../data/characters';
import { useGameStore } from '../store';
import type { Character } from '../schemas/character';

const ROLE_COLORS: Record<string, string> = {
  suspect: '#a83232',
  victim: '#7c3aed',
  detective: '#c9a84c',
};

const ROLE_EMOJI: Record<string, string> = {
  suspect: '🎭',
  victim: '💀',
  detective: '🔍',
};

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((word) => word[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

function getShortName(name: string): string {
  const parts = name.split(' ');
  if (parts.length <= 1) return name;
  // Для имён с "Доктор", "Мистер" и т.п. — берём фамилию
  const honorifics = ['Доктор', 'Мистер', 'Миссис', 'Мадам', 'Сэр'];
  if (honorifics.includes(parts[0])) {
    return parts.slice(1).join(' ');
  }
  return parts[parts.length - 1];
}

function CharacterAvatar({ character }: { character: Character }) {
  const setActiveSpeaker = useGameStore((s) => s.setActiveSpeaker);
  const setOverlay = useGameStore((s) => s.setOverlay);
  const activeSpeaker = useGameStore((s) => s.activeSpeaker);

  const isActive = activeSpeaker === character.id;
  const roleColor = ROLE_COLORS[character.role] ?? '#666';
  const emoji = ROLE_EMOJI[character.role] ?? '👤';

  const handleClick = () => {
    setActiveSpeaker(character.id);
    setOverlay('character_card');
  };

  return (
    <button
      onClick={handleClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
        background: 'transparent',
        border: 'none',
        padding: 'var(--spacing-xs)',
        minWidth: '56px',
        cursor: 'pointer',
        flexShrink: 0,
      }}
      aria-label={character.name}
    >
      <div
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${roleColor}33, ${roleColor}66)`,
          border: `2px solid ${isActive ? 'var(--color-accent)' : roleColor}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1rem',
          color: 'var(--color-text)',
          boxShadow: isActive ? '0 0 8px var(--color-accent)' : 'none',
          transition: 'all var(--transition-fast)',
        }}
      >
        {emoji}
      </div>
      <span
        style={{
          fontSize: '0.65rem',
          color: isActive ? 'var(--color-accent)' : 'var(--color-text-muted)',
          textAlign: 'center',
          maxWidth: '56px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          lineHeight: 1.2,
        }}
        title={character.name}
      >
        {getShortName(character.name)}
      </span>
    </button>
  );
}

export function CharacterBar() {
  const barCharacters = CHARACTERS
    .filter((c) => c.id !== 'char_01')
    .sort((a, b) => a.barOrder - b.barOrder);

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '80px',
        background: 'linear-gradient(to top, var(--color-bg-panel) 60%, transparent)',
        borderTop: '1px solid var(--color-border)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 var(--spacing-md)',
        overflowX: 'auto',
        overflowY: 'hidden',
        gap: 'var(--spacing-xs)',
        WebkitOverflowScrolling: 'touch',
        scrollbarWidth: 'none',
      }}
    >
      {barCharacters.map((character) => (
        <CharacterAvatar key={character.id} character={character} />
      ))}
    </div>
  );
}
