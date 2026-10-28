import { useState } from 'react';
import type { DailyPuzzle } from '../../schemas/dailyPuzzle';

interface SecretPuzzleProps {
  puzzle: DailyPuzzle;
  onSolve: () => void;
}

// Варианты ответов для каждой задачи
const PUZZLE_OPTIONS: Record<string, string[]> = {
  puzzle_01: [
    'Грабитель читал утреннюю газету',
    'Вечерние газеты выходят в 18:00',
    'Свидетель ошибся во времени',
    'Газету принёс кто-то другой',
  ],
};

export function SecretPuzzle({ puzzle, onSolve }: SecretPuzzleProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSolved, setIsSolved] = useState(false);

  const options = PUZZLE_OPTIONS[puzzle.id] ?? [puzzle.answer, 'Вариант 2', 'Вариант 3'];
  const correctAnswer = puzzle.answer;

  const handleOptionClick = (option: string) => {
    if (isSolved) return;

    setSelectedOption(option);

    // Проверяем правильность (сравнение по ключевым словам)
    const isCorrect = option.includes('18:00') || option === correctAnswer;

    if (isCorrect) {
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
        📰 {puzzle.title}
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

      {/* Варианты ответов */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacing-md)',
        }}
      >
        {options.map((option, index) => {
          const isSelected = selectedOption === option;
          const isCorrect = isSolved && (option.includes('18:00') || option === correctAnswer);
          const isWrong = isSelected && !isSolved && !isCorrect;

          return (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
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
                textAlign: 'left',
                cursor: isSolved ? 'default' : 'pointer',
                minHeight: '60px',
                transition: 'all var(--transition-fast)',
              }}
            >
              {option}
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
