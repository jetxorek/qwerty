import { useState } from 'react';
import type { ItemPuzzle as ItemPuzzleType } from '../../schemas/dailyPuzzle';

interface ItemPuzzleProps {
  puzzle: ItemPuzzleType;
  onSolve: () => void;
  onClose: () => void;
}

export function ItemPuzzle({ puzzle, onSolve, onClose }: ItemPuzzleProps) {
  const [status, setStatus] = useState<'idle' | 'wrong' | 'correct'>('idle');
  const [wrongItem, setWrongItem] = useState<string | null>(null);

  const handleSelect = (item: string) => {
    if (status === 'correct') return;
    if (item === puzzle.oddItem) {
      setStatus('correct');
      onSolve();
    } else {
      setWrongItem(item);
      setStatus('wrong');
    }
  };

  return (
    <div style={{ padding: 'var(--spacing-lg)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 'var(--spacing-sm)' }}>{puzzle.title}</h2>
      <p style={{ color: 'var(--color-text)', lineHeight: 1.6, marginBottom: 'var(--spacing-md)' }}>
        {puzzle.story}
      </p>

      <div
        style={{
          background: 'var(--color-bg-panel)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-md)',
          padding: 'var(--spacing-md)',
          marginBottom: 'var(--spacing-md)',
        }}
      >
        <p style={{ margin: 0, color: 'var(--color-text-muted)' }}>
          Место: {puzzle.location}
        </p>
        <p style={{ margin: 0, color: 'var(--color-text-muted)' }}>
          Время: {puzzle.timePeriod}
        </p>
      </div>

      <p style={{ color: 'var(--color-text)', marginBottom: 'var(--spacing-md)' }}>{puzzle.task}</p>

      <ol style={{ paddingLeft: 'var(--spacing-lg)', margin: 0 }}>
        {puzzle.items.map((item) => (
          <li key={item} style={{ marginBottom: 'var(--spacing-sm)' }}>
            <button
              onClick={() => handleSelect(item)}
              disabled={status === 'correct'}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: 'var(--spacing-md)',
                background: wrongItem === item ? 'var(--color-bg-panel)' : 'var(--color-bg-panel)',
                border:
                  wrongItem === item
                    ? '1px solid var(--color-accent)'
                    : '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--color-text)',
                fontSize: '1rem',
                cursor: status === 'correct' ? 'default' : 'pointer',
              }}
            >
              {item}
            </button>
          </li>
        ))}
      </ol>

      {status === 'wrong' && (
        <p style={{ color: 'var(--color-accent)', marginTop: 'var(--spacing-md)', textAlign: 'center' }}>
          Этот предмет здесь уместен. Подумайте ещё.
        </p>
      )}

      {status === 'correct' && (
        <div style={{ marginTop: 'var(--spacing-lg)' }}>
          <p style={{ color: 'var(--color-text)', lineHeight: 1.6 }}>{puzzle.explanation}</p>
          <button
            onClick={onClose}
            style={{
              width: '100%',
              marginTop: 'var(--spacing-md)',
              padding: 'var(--spacing-md)',
              background: 'transparent',
              color: 'var(--color-text)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              fontSize: '1rem',
              cursor: 'pointer',
            }}
          >
            К депешам
          </button>
        </div>
      )}
    </div>
  );
}
