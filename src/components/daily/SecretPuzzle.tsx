import { useState } from 'react';
import type { SecretPuzzle as SecretPuzzleType } from '../../schemas/dailyPuzzle';

interface SecretPuzzleProps {
  puzzle: SecretPuzzleType;
  onSolve: () => void;
  onClose: () => void;
}

export function SecretPuzzle({ puzzle, onSolve, onClose }: SecretPuzzleProps) {
  const [status, setStatus] = useState<'idle' | 'wrong' | 'correct'>('idle');
  const [wrongOption, setWrongOption] = useState<string | null>(null);

  const handleSelect = (option: string) => {
    if (status === 'correct') return;
    if (option === puzzle.correctAnswer) {
      setStatus('correct');
      onSolve();
    } else {
      setWrongOption(option);
      setStatus('wrong');
    }
  };

  return (
    <div style={{ padding: 'var(--spacing-lg)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 'var(--spacing-sm)' }}>{puzzle.title}</h2>
      <p style={{ color: 'var(--color-text)', lineHeight: 1.6, marginBottom: 'var(--spacing-md)' }}>
        {puzzle.story}
      </p>

      {puzzle.location && (
        <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-md)' }}>
          Место: {puzzle.location}
        </p>
      )}

      <div style={{ marginBottom: 'var(--spacing-lg)' }}>
        {puzzle.testimonials.map((t) => (
          <blockquote
            key={t.speaker}
            style={{
              margin: '0 0 var(--spacing-md) 0',
              padding: 'var(--spacing-md)',
              background: 'var(--color-bg-panel)',
              borderLeft: '3px solid var(--color-accent)',
              borderRadius: 'var(--radius-md)',
            }}
          >
            <p style={{ margin: '0 0 var(--spacing-sm) 0', color: 'var(--color-text-muted)', fontWeight: 600 }}>
              {t.speaker}
            </p>
            <p style={{ margin: 0, color: 'var(--color-text)', lineHeight: 1.6 }}>{t.text}</p>
          </blockquote>
        ))}
      </div>

      <p style={{ color: 'var(--color-text)', marginBottom: 'var(--spacing-md)' }}>
        Что здесь не сходится?
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
        {puzzle.options.map((option) => (
          <button
            key={option}
            onClick={() => handleSelect(option)}
            disabled={status === 'correct'}
            style={{
              width: '100%',
              textAlign: 'left',
              padding: 'var(--spacing-md)',
              background: 'var(--color-bg-panel)',
              border:
                wrongOption === option
                  ? '1px solid var(--color-accent)'
                  : '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--color-text)',
              fontSize: '1rem',
              cursor: status === 'correct' ? 'default' : 'pointer',
            }}
          >
            {option}
          </button>
        ))}
      </div>

      {status === 'wrong' && (
        <p style={{ color: 'var(--color-accent)', marginTop: 'var(--spacing-md)', textAlign: 'center' }}>
          Не то. Перечитайте показания.
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
