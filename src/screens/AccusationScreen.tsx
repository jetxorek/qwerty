import { useState } from 'react';
import { useGameStore } from '../store';
import { NOTE_MATRIX } from '../data/noteMatrix';
import { AppHeader } from '../components/AppHeader';
import { getCharacterById } from '../data/characters';

const SUSPECTS = ['char_02', 'char_03'];

export function AccusationScreen() {
  const setScreen = useGameStore((s) => s.setScreen);
  const notes = useGameStore((s) => s.notes);
  const accusationResult = useGameStore((s) => s.accusationResult);
  const submitAccusation = useGameStore((s) => s.submitAccusation);
  const resetAccusation = useGameStore((s) => s.resetAccusation);

  const [culpritId, setCulpritId] = useState<string | null>(null);
  const [selectedNoteIds, setSelectedNoteIds] = useState<string[]>([]);

  const toggleNote = (id: string) => {
    if (selectedNoteIds.includes(id)) {
      setSelectedNoteIds(selectedNoteIds.filter((n) => n !== id));
    } else {
      setSelectedNoteIds([...selectedNoteIds, id]);
    }
  };

  const handleSubmit = () => {
    if (!culpritId) return;
    submitAccusation(culpritId);
  };

  const handleBackToMenu = () => {
    resetAccusation();
    setScreen('main_menu');
  };

  const activeNotes = notes.filter((n) => !n.discarded);

  // Экран результата
  if (accusationResult) {
    const verdictText =
      accusationResult.verdict === 'full'
        ? 'Победа!'
        : accusationResult.verdict === 'partial'
        ? 'Частичный успех'
        : 'Провал';

    const verdictColor =
      accusationResult.verdict === 'full'
        ? 'var(--color-success)'
        : accusationResult.verdict === 'partial'
        ? 'var(--color-accent)'
        : 'var(--color-danger)';

    const missedStrong = NOTE_MATRIX.filter(
      (m) => m.isStrong && !selectedNoteIds.includes(m.id)
    );

    return (
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <AppHeader title="Результат обвинения" showBack />
        <div style={{ flex: 1, padding: 'var(--spacing-lg)', overflowY: 'auto' }}>
          <div style={{ maxWidth: '500px', margin: '0 auto' }}>
            {/* Вердикт */}
            <div
              style={{
                textAlign: 'center',
                padding: 'var(--spacing-xl)',
                background: 'var(--color-bg-panel)',
                borderRadius: 'var(--radius-lg)',
                border: `2px solid ${verdictColor}`,
                marginBottom: 'var(--spacing-lg)',
              }}
            >
              <h2
                style={{
                  margin: '0 0 var(--spacing-md)',
                  color: verdictColor,
                  fontSize: 'var(--font-size-2xl)',
                  fontFamily: 'var(--font-main)',
                }}
              >
                {verdictText}
              </h2>
              <p style={{ margin: 0, color: 'var(--color-text)' }}>
                {accusationResult.isCorrectCulprit
                  ? 'Вы обвинили правильного подозреваемого!'
                  : 'Вы обвинили невиновного...'}
              </p>
            </div>

            {/* Статистика */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 'var(--spacing-md)',
                marginBottom: 'var(--spacing-lg)',
              }}
            >
              <div
                style={{
                  padding: 'var(--spacing-lg)',
                  background: 'var(--color-bg-panel)',
                  borderRadius: 'var(--radius-md)',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                  Очки
                </div>
                <div
                  style={{
                    fontSize: 'var(--font-size-2xl)',
                    fontWeight: 'bold',
                    color: 'var(--color-accent)',
                  }}
                >
                  {accusationResult.score}
                </div>
              </div>
              <div
                style={{
                  padding: 'var(--spacing-lg)',
                  background: 'var(--color-bg-panel)',
                  borderRadius: 'var(--radius-md)',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                  Охват категорий
                </div>
                <div
                  style={{
                    fontSize: 'var(--font-size-2xl)',
                    fontWeight: 'bold',
                    color: 'var(--color-accent)',
                  }}
                >
                  {accusationResult.coverageCount}/5
                </div>
              </div>
            </div>

            {/* Упущенные сильные улики */}
            {missedStrong.length > 0 && (
              <div
                style={{
                  padding: 'var(--spacing-lg)',
                  background: 'var(--color-bg-panel)',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: 'var(--spacing-lg)',
                }}
              >
                <h3
                  style={{
                    margin: '0 0 var(--spacing-md)',
                    color: 'var(--color-text)',
                    fontSize: 'var(--font-size-md)',
                  }}
                >
                  Упущенные ключевые улики:
                </h3>
                <ul style={{ margin: 0, paddingLeft: 'var(--spacing-lg)', color: 'var(--color-text-muted)' }}>
                  {missedStrong.map((item) => (
                    <li key={item.id} style={{ marginBottom: 'var(--spacing-sm)' }}>
                      {item.statement}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Кнопка в меню */}
            <button
              onClick={handleBackToMenu}
              style={{
                width: '100%',
                padding: 'var(--spacing-lg)',
                background: 'var(--color-accent)',
                color: 'var(--color-bg)',
                border: 'none',
                borderRadius: 'var(--radius-lg)',
                fontSize: 'var(--font-size-lg)',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              В меню
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Экран выбора
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppHeader title="Обвинение" showBack />
      <div style={{ flex: 1, padding: 'var(--spacing-lg)', overflowY: 'auto' }}>
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
          {/* Выбор подозреваемого */}
          <div style={{ marginBottom: 'var(--spacing-xl)' }}>
            <h2
              style={{
                margin: '0 0 var(--spacing-md)',
                color: 'var(--color-text)',
                fontSize: 'var(--font-size-lg)',
                fontFamily: 'var(--font-main)',
              }}
            >
              Кого вы обвиняете?
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
              {SUSPECTS.map((id) => {
                const character = getCharacterById(id);
                if (!character) return null;
                const isSelected = culpritId === id;
                return (
                  <button
                    key={id}
                    onClick={() => setCulpritId(id)}
                    style={{
                      padding: 'var(--spacing-lg)',
                      background: isSelected ? 'var(--color-bg-elevated)' : 'var(--color-bg-panel)',
                      border: `2px solid ${isSelected ? 'var(--color-accent)' : 'var(--color-border)'}`,
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--color-text)',
                      fontSize: 'var(--font-size-md)',
                      textAlign: 'left',
                      cursor: 'pointer',
                    }}
                  >
                    {character.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Выбор улик */}
          <div style={{ marginBottom: 'var(--spacing-xl)' }}>
            <h2
              style={{
                margin: '0 0 var(--spacing-md)',
                color: 'var(--color-text)',
                fontSize: 'var(--font-size-lg)',
                fontFamily: 'var(--font-main)',
              }}
            >
              Какие улики предъявить?
            </h2>
            {activeNotes.length === 0 ? (
              <p style={{ color: 'var(--color-text-muted)' }}>
                У вас нет улик. Добавьте их в блокнот во время расследования.
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                {activeNotes.map((note) => {
                  const isSelected = selectedNoteIds.includes(note.id);
                  return (
                    <label
                      key={note.id}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 'var(--spacing-md)',
                        padding: 'var(--spacing-md)',
                        background: isSelected ? 'var(--color-bg-elevated)' : 'var(--color-bg-panel)',
                        border: `1px solid ${isSelected ? 'var(--color-accent)' : 'var(--color-border)'}`,
                        borderRadius: 'var(--radius-md)',
                        cursor: 'pointer',
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleNote(note.id)}
                        style={{ marginTop: '4px' }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ color: 'var(--color-text)', fontSize: 'var(--font-size-sm)' }}>
                          {note.statement}
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          {/* Кнопка обвинения */}
          <button
            onClick={handleSubmit}
            disabled={!culpritId}
            style={{
              width: '100%',
              padding: 'var(--spacing-lg)',
              background: culpritId ? 'var(--color-accent)' : 'var(--color-bg-elevated)',
              color: culpritId ? 'var(--color-bg)' : 'var(--color-text-muted)',
              border: 'none',
              borderRadius: 'var(--radius-lg)',
              fontSize: 'var(--font-size-lg)',
              fontWeight: 'bold',
              cursor: culpritId ? 'pointer' : 'not-allowed',
            }}
          >
            Предъявить обвинение
          </button>
        </div>
      </div>
    </div>
  );
}
