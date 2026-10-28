import { useState } from 'react';
import type { CipherPuzzle as CipherPuzzleType } from '../../schemas/dailyPuzzle';

interface CipherPuzzleProps {
  puzzle: CipherPuzzleType;
  onSolve: () => void;
  onClose: () => void;
}

export function CipherPuzzle({ puzzle, onSolve, onClose }: CipherPuzzleProps) {
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<'idle' | 'wrong' | 'correct'>('idle');

  const handleCheck = () => {
    if (status === 'correct') return;
    const normalized = input.trim().toUpperCase();
    const expected = puzzle.correctAnswer.trim().toUpperCase();
    if (normalized === expected) {
      setStatus('correct');
      onSolve();
    } else {
      setStatus('wrong');
    }
  };

  return (
    <div style={{ padding: 'var(--spacing-lg)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 'var(--spacing-sm)' }}>{puzzle.title}</h2>
      <p style={{ color: 'var(--color-text)', lineHeight: 1.6, marginBottom: 'var(--spacing-lg)' }}>
        {puzzle.story}
      </p>

      <pre
        style={{
          background: 'var(--color-bg-panel)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-md)',
          padding: 'var(--spacing-lg)',
          fontSize: '1.3rem',
          letterSpacing: '0.15em',
          textAlign: 'center',
          marginBottom: 'var(--spacing-sm)',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}
      >
        {puzzle.cipherText}
      </pre>

      {puzzle.hint && (
        <p style={{ color: 'var(--color-text-muted)', textAlign: 'center', marginBottom: 'var(--spacing-md)' }}>
          {puzzle.hint}
        </p>
      )}

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={status === 'correct'}
        placeholder="Введите ответ"
        style={{
          width: '100%',
          padding: 'var(--spacing-md)',
          background: 'var(--color-bg-panel)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-md)',
          color: 'var(--color-text)',
          fontSize: '1rem',
          marginBottom: 'var(--spacing-md)',
        }}
      />

      {status !== 'correct' && (
        <button
          onClick={handleCheck}
          style={{
            width: '100%',
            padding: 'var(--spacing-md)',
            background: 'var(--color-accent)',
            color: 'var(--color-bg)',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            fontSize: '1rem',
            cursor: 'pointer',
          }}
        >
          Проверить
        </button>
      )}

      {status === 'wrong' && (
        <p style={{ color: 'var(--color-accent)', marginTop: 'var(--spacing-md)', textAlign: 'center' }}>
          Неверно. Попробуйте ещё раз.
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
