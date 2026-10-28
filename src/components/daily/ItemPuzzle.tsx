import { useState } from 'react';
import type { DailyPuzzle } from '../../schemas/dailyPuzzle';

interface ItemPuzzleProps {
  puzzle: DailyPuzzle;
  onSolve: () => void;
}

interface ItemOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

// Варианты ответов для каждой задачи
const PUZZLE_ITEMS: Record<string, ItemOption[]> = {
  puzzle_03: [
    { id: 'item_1', text: 'Он был в Александрии', isCorrect: false },
    { id: 'item_2', text: 'Он был в Каире', isCorrect: true },
    { id: 'item_3', text: 'Он был в Луксоре', isCorrect: false },
    { id: 'item_4', text: 'Он был в Асуане', isCorrect: false },
  ],
};

export function ItemPuzzle({ puzzle, onSolve }: ItemPuzzleProps) {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [isSolved, setIsSolved] = useState(false);

  const items = PUZZLE_ITEMS[puzzle.id] ?? [];

  const handleItemClick = (item: ItemOption) => {
    if (isSolved) return;

    setSelectedItem(item.id);

    if (item.isCorrect) {
      setIsSolved(true);
      setTimeout(() => {
        onSolve();
      }, 500);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-lg)',
      }}
    >
      {/* Заголовок */}
      <h2
        style={{
          margin: 0,
          color: 'var(--color-accent)',
          fontFamily: 'var(--font-main)',
          fontSize: 'var(--font-size-xl)',
        }}
      >
        🔎 {puzzle.title}
      </h2>

      {/* Описание */}
      <div
        style={{
          padding: 'var(--spacing-lg)',
          background: 'var(--color-bg-elevated)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-border)',
        }}
      >
        <p
          style={{
            margin: 0,
            color: 'var(--color-text)',
            fontSize: 'var(--font-size-md)',
            lineHeight: 1.7,
          }}
        >
          {puzzle.description}
        </p>
      </div>

      {/* Подсказка */}
      {puzzle.hint && !isSolved && (
        <div
          style={{
            padding: 'var(--spacing-md)',
            background: 'rgba(201, 168, 76, 0.1)',
            borderRadius: 'var(--radius-md)',
            borderLeft: '3px solid var(--color-accent)',
          }}
        >
          <p
            style={{
              margin: 0,
              color: 'var(--color-text-muted)',
              fontSize: 'var(--font-size-sm)',
              fontStyle: 'italic',
            }}
          >
            💡 {puzzle.hint}
          </p>
        </div>
      )}

      {/* Карточки с вариантами */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 'var(--spacing-md)',
        }}
      >
        {items.map((item) => {
          const isSelected = selectedItem === item.id;
          const isCorrect = isSolved && item.isCorrect;
          const isWrong = isSelected && !isSolved && !item.isCorrect;

          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item)}
              disabled={isSolved}
              style={{
                padding: 'var(--spacing-lg)',
                background: isCorrect
                  ? 'rgba(50, 168, 82, 0.2)'
                  : isWrong
                  ? 'rgba(168, 50, 50, 0.2)'
                  : 'var(--color-bg-panel)',
                border: `2px solid ${
                  isCorrect ? 'var(--color-success)' : isWrong ? 'var(--color-danger)' : 'var(--color-border)'
                }`,
                borderRadius: 'var(--radius-lg)',
                color: 'var(--color-text)',
                fontSize: 'var(--font-size-md)',
                textAlign: 'center',
                cursor: isSolved ? 'default' : 'pointer',
                minHeight: '80px',
                transition: 'all var(--transition-fast)',
              }}
            >
              {item.text}
            </button>
          );
        })}
      </div>

      {/* Объяснение */}
      {isSolved && (
        <div
          style={{
            padding: 'var(--spacing-lg)',
            background: 'rgba(50, 168, 82, 0.1)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-success)',
          }}
        >
          <h3
            style={{
              margin: '0 0 var(--spacing-sm)',
              color: 'var(--color-success)',
              fontSize: 'var(--font-size-md)',
            }}
          >
            ✓ Верно!
          </h3>
          <p
            style={{
              margin: 0,
              color: 'var(--color-text)',
              fontSize: 'var(--font-size-sm)',
              lineHeight: 1.6,
            }}
          >
            {puzzle.explanation}
          </p>
        </div>
      )}
    </div>
  );
}
