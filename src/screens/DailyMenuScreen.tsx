import { useGameStore } from '../store';
import { DAILY_PUZZLES } from '../data/dailyPuzzles';
import type { DailyPuzzle } from '../schemas/dailyPuzzle';

function PuzzleCard({ puzzle }: { puzzle: DailyPuzzle }) {
  const typeIcons: Record<string, string> = {
    secret: '🤫',
    cipher: '🔐',
    item: '🔎',
  };

  const typeLabels: Record<string, string> = {
    secret: 'Секрет',
    cipher: 'Шифр',
    item: 'Вещдок',
  };

  return (
    <div
      style={{
        padding: 'var(--spacing-lg)',
        background: 'var(--color-bg-panel)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--spacing-sm)' }}>
        <h3 style={{ margin: 0, color: 'var(--color-text)', fontFamily: 'var(--font-main)', fontSize: 'var(--font-size-lg)' }}>
          {puzzle.title}
        </h3>
        <span
          style={{
            fontSize: 'var(--font-size-xs)',
            padding: '2px 8px',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--color-bg-elevated)',
            color: 'var(--color-accent)',
            border: '1px solid var(--color-border-accent)',
            whiteSpace: 'nowrap',
          }}
        >
          {typeIcons[puzzle.type]} {typeLabels[puzzle.type]}
        </span>
      </div>
      <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', lineHeight: 1.5, margin: 0 }}>
        {puzzle.description}
      </p>
    </div>
  );
}

export function DailyMenuScreen() {
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
          📅 Ежедневные дела
        </h1>
      </div>

      <div style={{ maxWidth: '500px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
        {DAILY_PUZZLES.map((puzzle) => (
          <PuzzleCard key={puzzle.id} puzzle={puzzle} />
        ))}
      </div>
    </div>
  );
}
