import { useState } from 'react';
import { useGameStore } from '../store';
import { NOTE_MATRIX } from '../data/noteMatrix';
import { AppHeader } from '../components/AppHeader';
import type { Note } from '../schemas/note';

export function AccusationScreen() {
  const setScreen = useGameStore((s) => s.setScreen);
  const notes = useGameStore((s) => s.notes);
  const accusationResult = useGameStore((s) => s.accusationResult);
  const submitAccusation = useGameStore((s) => s.submitAccusation);
  const resetAccusation = useGameStore((s) => s.resetAccusation);

  const [culpritId, setCulpritId] = useState<string | null>(null);
  const [selectedNoteIds, setSelectedNoteIds] = useState<string[]>([]);

  const activeNotes = notes.filter((n) => !n.discarded);

  const toggleNote = (id: string) => {
    if (selectedNoteIds.includes(id)) {
      setSelectedNoteIds(selectedNoteIds.filter((n) => n !== id));
    } else {
      setSelectedNoteIds([...selectedNoteIds, id]);
    }
  };

  const handleSubmit = () => {
    if (!culpritId) return;
    const selected = activeNotes.filter((n) => selectedNoteIds.includes(n.id));
    submitAccusation(culpritId, selected);
  };

  if (accusationResult) {
    const missedStrong = NOTE_MATRIX.filter((m) => m.isStrong && !selectedNoteIds.includes(m.id));
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <AppHeader 
          title="Вердикт" 
          showBack 
          rightContent={
            <button
              onClick={() => { resetAccusation(); setScreen('main_menu'); }}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--color-accent)',
                fontSize: '0.9rem',
                cursor: 'pointer',
              }}
            >
              В меню
            </button>
          }
        />
        <div style={{ padding: 'var(--spacing-lg)' }}>
          <h2 style={{ color: accusationResult.verdict === 'full' ? 'var(--color-accent)' : 'var(--color-text)', textAlign: 'center' }}>
            {accusationResult.verdict === 'full' ? 'Дело раскрыто!' : accusationResult.verdict === 'partial' ? 'Частичный успех' : 'Дело провалено'}
          </h2>
          
          <div style={{ margin: 'var(--spacing-lg) 0', padding: 'var(--spacing-md)', background: 'var(--color-bg-panel)', borderRadius: 'var(--radius-md)' }}>
            <p>Очки обвинения: <strong>{accusationResult.score}</strong></p>
            <p>Охват категорий: <strong>{accusationResult.coverageCount} / 5</strong></p>
          </div>

          {missedStrong.length > 0 && (
            <div style={{ marginBottom: 'var(--spacing-lg)' }}>
              <h3 style={{ color: 'var(--color-accent)' }}>Вы упустили ключевые улики:</h3>
              <ul style={{ paddingLeft: 'var(--spacing-lg)' }}>
                {missedStrong.map((m) => (
                  <li key={m.id} style={{ marginBottom: 'var(--spacing-sm)' }}>{m.statement}</li>
                ))}
              </ul>
            </div>
          )}

          <button
            onClick={() => { resetAccusation(); setScreen('main_menu'); }}
            style={{ width: '100%', padding: 'var(--spacing-md)', background: 'var(--color-accent)', color: 'var(--color-bg)', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}
          >
            В меню
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppHeader 
        title="Обвинение" 
        showBack 
        rightContent={
          <button
            onClick={() => setScreen('scene')}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--color-accent)',
              fontSize: '0.9rem',
              cursor: 'pointer',
            }}
          >
            Назад
          </button>
        }
      />
      <div style={{ padding: 'var(--spacing-lg)' }}>
        <h2>Кого вы обвиняете?</h2>
        <div style={{ display: 'flex', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-lg)' }}>
          <button
            onClick={() => setCulpritId('char_02')}
            style={{ flex: 1, padding: 'var(--spacing-md)', background: culpritId === 'char_02' ? 'var(--color-accent)' : 'var(--color-bg-panel)', color: culpritId === 'char_02' ? 'var(--color-bg)' : 'var(--color-text)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}
          >
            Симон
          </button>
          <button
            onClick={() => setCulpritId('char_03')}
            style={{ flex: 1, padding: 'var(--spacing-md)', background: culpritId === 'char_03' ? 'var(--color-accent)' : 'var(--color-bg-panel)', color: culpritId === 'char_03' ? 'var(--color-bg)' : 'var(--color-text)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}
          >
            Жанна
          </button>
        </div>

        <h3>Выберите улики из блокнота:</h3>
        {activeNotes.length === 0 ? (
          <p style={{ color: 'var(--color-text-muted)' }}>У вас нет собранных улик.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-lg)' }}>
            {activeNotes.map((note) => (
              <label key={note.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-sm)', padding: 'var(--spacing-sm)', background: 'var(--color-bg-panel)', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={selectedNoteIds.includes(note.id)}
                  onChange={() => toggleNote(note.id)}
                  style={{ marginTop: '4px' }}
                />
                <span style={{ fontSize: '0.9rem', lineHeight: 1.4 }}>{note.statement}</span>
              </label>
            ))}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={!culpritId}
          style={{ width: '100%', padding: 'var(--spacing-md)', background: culpritId ? 'var(--color-accent)' : 'var(--color-border)', color: culpritId ? 'var(--color-bg)' : 'var(--color-text-muted)', border: 'none', borderRadius: 'var(--radius-md)', cursor: culpritId ? 'pointer' : 'not-allowed', fontWeight: 'bold' }}
        >
          Предъявить обвинение
        </button>
      </div>
    </div>
  );
}
