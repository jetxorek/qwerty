import { useState } from 'react';
import type { DailyPuzzle } from '../../schemas/dailyPuzzle';

interface CipherPuzzleProps {
  puzzle: DailyPuzzle;
  onSolve: () => void;
}

// Cipher text для каждой задачи
const CIPHER_TEXTS: Record<string, string> = {
  puzzle_02: '. --. .. .--. . -',
};

export function CipherPuzzle({ puzzle, onSolve }: CipherPuzzleProps) {
  const [userAnswer, setUserAnswer] = useState('');
  const [isSolved, setIsSolved] = useState(false);
  const [showError, setShowError] = useState(false);

  const cipherText = CIPHER_TEXTS[puzzle.id] ?? '';
  const correctAnswer = puzzle.answer;

  const normalizeAnswer = (str: string): string => {
    return str.trim().toLowerCase().replace(/\s+/g, '');
  };

  const handleCheck = () => {
    if (isSolved) return;

    const normalizedUser = normalizeAnswer(userAnswer);
    const normalizedCorrect = normalizeAnswer(correctAnswer);

    if (normalizedUser === normalizedCorrect) {
      setIsSolved(true);
      setShowError(false);
      setTimeout(() => {
        onSolve();
      }, 500);
    } else {
      setShowError(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCheck();
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
        🔐 {puzzle.title}
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
            margin: '0 0 var(--spacing-md)',
            color: 'var(--color-text)',
            fontSize: 'var(--font-size-md)',
            lineHeight: 1.7,
          }}
        >
          {puzzle.description}
        </p>

        {/* Шифр */}
        {cipherText && (
          <div
            style={{
              padding: 'var(--spacing-lg)',
              background: 'var(--color-bg)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)',
              textAlign: 'center',
            }}
          >
            <code
              style={{
                fontFamily: 'monospace',
                fontSize: 'var(--font-size-xl)',
                color: 'var(--color-accent)',
                letterSpacing: '0.2em',
                wordBreak: 'break-all',
              }}
            >
              {cipherText}
            </code>
          </div>
        )}
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

      {/* Поле ввода */}
      {!isSolved && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--spacing-md)',
          }}
        >
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => {
              setUserAnswer(e.target.value);
              setShowError(false);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Введите ответ..."
            disabled={isSolved}
            style={{
              padding: 'var(--spacing-lg)',
              background: 'var(--color-bg-panel)',
              border: `2px solid ${showError ? 'var(--color-danger)' : 'var(--color-border)'}`,
              borderRadius: 'var(--radius-lg)',
              color: 'var(--color-text)',
              fontSize: 'var(--font-size-lg)',
              fontFamily: 'inherit',
              minHeight: '56px',
            }}
          />

          {showError && (
            <p
              style={{
                margin: 0,
                color: 'var(--color-danger)',
                fontSize: 'var(--font-size-sm)',
                textAlign: 'center',
              }}
            >
              Неверно. Попробуйте ещё раз.
            </p>
          )}

          <button
            onClick={handleCheck}
            disabled={!userAnswer.trim()}
            style={{
              padding: 'var(--spacing-lg)',
              background: userAnswer.trim() ? 'var(--color-accent)' : 'var(--color-bg-elevated)',
              color: userAnswer.trim() ? 'var(--color-bg)' : 'var(--color-text-muted)',
              border: 'none',
              borderRadius: 'var(--radius-lg)',
              fontSize: 'var(--font-size-lg)',
              fontWeight: 'bold',
              fontFamily: 'var(--font-main)',
              minHeight: '56px',
              cursor: userAnswer.trim() ? 'pointer' : 'not-allowed',
            }}
          >
            Проверить
          </button>
        </div>
      )}

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
