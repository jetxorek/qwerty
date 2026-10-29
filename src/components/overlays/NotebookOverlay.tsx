import { useState, useCallback } from 'react';
import { useGameStore } from '../../store';
import { CHARACTERS, getCharacterById } from '../../data/characters';
import type { Note, NoteCategory } from '../../schemas/note';

const CATEGORY_LABELS: Record<NoteCategory, string> = {
  motive: '🎯 Мотив',
  opportunity: '🎯 Возможность',
  alibi: '🕐 Алиби',
  psychology: '🧠 Психология',
  contradiction: '⚡ Противоречие',
  evidence: '🔎 Улика',
  witness: '👁 Свидетель',
  timeline: '⏳ Хронология',
  other: '📝 Прочее',
};

const TRUTH_COLORS: Record<string, string> = {
  true: '#32a852',
  false: '#a83232',
  plausible: '#c9a84c',
};

// Type guard для безопасной типизации ключей категорий
function isNoteCategory(value: string): value is NoteCategory {
  return value in CATEGORY_LABELS;
}

function NoteCard({ note }: { note: Note }) {
  const toggleNoteImportant = useGameStore((s) => s.toggleNoteImportant);
  const toggleNoteDiscarded = useGameStore((s) => s.toggleNoteDiscarded);
  const removeNote = useGameStore((s) => s.removeNote);

  const target = note.target ? getCharacterById(note.target) : null;
  const truthColor = TRUTH_COLORS[note.truth];

  return (
    <div
      style={{
        padding: 'var(--spacing-md)',
        background: note.discarded ? 'var(--color-bg)' : 'var(--color-bg-elevated)',
        borderRadius: 'var(--radius-md)',
        border: `1px solid ${note.important ? 'var(--color-accent)' : 'var(--color-border)'}`,
        opacity: note.discarded ? 0.5 : 1,
        position: 'relative',
      }}
    >
      {/* Индикатор истины */}
      <div
        style={{
          position: 'absolute',
          top: 'var(--spacing-sm)',
          right: 'var(--spacing-sm)',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: truthColor,
        }}
        title={`Истинность: ${note.truth}`}
      />

      {/* Текст заметки */}
      <p
        style={{
          margin: '0 0 var(--spacing-sm)',
          color: 'var(--color-text)',
          fontSize: 'var(--font-size-sm)',
          lineHeight: 1.5,
          paddingRight: '20px',
        }}
      >
        {note.statement}
      </p>

      {/* Метаданные */}
      <div
        style={{
          display: 'flex',
          gap: 'var(--spacing-sm)',
          alignItems: 'center',
          flexWrap: 'wrap',
          marginBottom: 'var(--spacing-sm)',
        }}
      >
        <span
          style={{
            fontSize: 'var(--font-size-xs)',
            color: 'var(--color-text-muted)',
            background: 'var(--color-bg-panel)',
            padding: '2px 6px',
            borderRadius: 'var(--radius-sm)',
          }}
        >
          {CATEGORY_LABELS[note.category]}
        </span>
        {note.isPersonal && (
          <span
            style={{
              fontSize: 'var(--font-size-xs)',
              color: '#7c3aed',
              background: 'rgba(124, 58, 237, 0.1)',
              padding: '2px 6px',
              borderRadius: 'var(--radius-sm)',
            }}
          >
            Моя заметка
          </span>
        )}
        {target && (
          <span
            style={{
              fontSize: 'var(--font-size-xs)',
              color: 'var(--color-accent)',
            }}
          >
            → {target.name}
          </span>
        )}
      </div>

      {/* Кнопки действий */}
      <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
        <button
          onClick={() => toggleNoteImportant(note.id)}
          style={{
            background: 'transparent',
            border: 'none',
            fontSize: '1rem',
            padding: '2px 4px',
            cursor: 'pointer',
            opacity: note.important ? 1 : 0.4,
          }}
          title={note.important ? 'Снять важность' : 'Отметить важным'}
        >
          ☆
        </button>
        <button
          onClick={() => toggleNoteDiscarded(note.id)}
          style={{
            background: 'transparent',
            border: 'none',
            fontSize: '1rem',
            padding: '2px 4px',
            cursor: 'pointer',
            opacity: note.discarded ? 1 : 0.4,
            color: note.discarded ? 'var(--color-danger)' : 'var(--color-text-muted)',
          }}
          title={note.discarded ? 'Восстановить' : 'Отбросить'}
        >
          ✕
        </button>
        <button
          onClick={() => removeNote(note.id)}
          style={{
            background: 'transparent',
            border: 'none',
            fontSize: '0.8rem',
            padding: '2px 4px',
            cursor: 'pointer',
            color: 'var(--color-text-muted)',
            marginLeft: 'auto',
          }}
          title="Удалить"
        >
          🗑
        </button>
      </div>
    </div>
  );
}

export function NotebookOverlay() {
  const setOverlay = useGameStore((s) => s.setOverlay);
  const notes = useGameStore((s) => s.notes);
  const notebookView = useGameStore((s) => s.notebookView);
  const setNotebookView = useGameStore((s) => s.setNotebookView);

  const [showManualInput, setShowManualInput] = useState(false);
  const [manualText, setManualText] = useState('');
  const addPersonalNote = useGameStore((s) => s.addPersonalNote);

  const handleClose = () => {
    setOverlay('none');
  };

  const handleAddManual = useCallback(() => {
    if (manualText.trim()) {
      addPersonalNote(manualText.trim());
      setManualText('');
      setShowManualInput(false);
    }
  }, [manualText, addPersonalNote]);

  // Счётчики
  const totalNotes = notes.length;
  const importantNotes = notes.filter((n) => n.important && !n.discarded).length;
  const personalNotes = notes.filter((n) => n.isPersonal).length;

  // Группировка
  const activeNotes = notes.filter((n) => !n.discarded);
  const discardedNotes = notes.filter((n) => n.discarded);

  const groupedByCategory = activeNotes.reduce<Record<string, Note[]>>((acc, note) => {
    const key = note.category;
    if (!acc[key]) acc[key] = [];
    acc[key].push(note);
    return acc;
  }, {});

  const groupedByCharacter = activeNotes.reduce<Record<string, Note[]>>((acc, note) => {
    const key = note.target ?? 'none';
    if (!acc[key]) acc[key] = [];
    acc[key].push(note);
    return acc;
  }, {});

  // Безопасное получение типизированных ключей категорий через type guard
  const categoryKeys = Object.keys(groupedByCategory).filter(isNoteCategory);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50,
        padding: 'var(--spacing-md)',
        backdropFilter: 'blur(4px)',
      }}
      onClick={handleClose}
    >
      <div
        style={{
          background: 'var(--color-bg-panel)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-xl)',
          width: '100%',
          maxWidth: '500px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Шапка */}
        <div
          style={{
            padding: 'var(--spacing-lg)',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)' }}>
            <h2
              style={{
                margin: 0,
                color: 'var(--color-accent)',
                fontFamily: 'var(--font-main)',
                fontSize: 'var(--font-size-xl)',
              }}
            >
              📓 Блокнот
            </h2>
            <button
              onClick={handleClose}
              style={{
                background: 'transparent',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text-muted)',
                borderRadius: 'var(--radius-sm)',
                padding: 'var(--spacing-xs) var(--spacing-sm)',
                fontSize: 'var(--font-size-sm)',
              }}
            >
              ✕
            </button>
          </div>

          {/* Счётчики */}
          <div
            style={{
              display: 'flex',
              gap: 'var(--spacing-md)',
              marginBottom: 'var(--spacing-md)',
            }}
          >
            <div style={{ textAlign: 'center', flex: 1 }}>
              <div style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'bold', color: 'var(--color-text)' }}>
                {totalNotes}
              </div>
              <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                Всего
              </div>
            </div>
            <div style={{ textAlign: 'center', flex: 1 }}>
              <div style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'bold', color: 'var(--color-accent)' }}>
                {importantNotes}
              </div>
              <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                Важных
              </div>
            </div>
            <div style={{ textAlign: 'center', flex: 1 }}>
              <div style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'bold', color: '#7c3aed' }}>
                {personalNotes}
              </div>
              <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                Мои
              </div>
            </div>
          </div>

          {/* Вкладки */}
          <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
            <button
              onClick={() => setNotebookView('categories')}
              style={{
                flex: 1,
                padding: 'var(--spacing-sm)',
                background: notebookView === 'categories' ? 'var(--color-accent)' : 'var(--color-bg-elevated)',
                color: notebookView === 'categories' ? 'var(--color-bg)' : 'var(--color-text)',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                fontSize: 'var(--font-size-sm)',
                fontWeight: 'bold',
              }}
            >
              По категориям
            </button>
            <button
              onClick={() => setNotebookView('characters')}
              style={{
                flex: 1,
                padding: 'var(--spacing-sm)',
                background: notebookView === 'characters' ? 'var(--color-accent)' : 'var(--color-bg-elevated)',
                color: notebookView === 'characters' ? 'var(--color-bg)' : 'var(--color-text)',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                fontSize: 'var(--font-size-sm)',
                fontWeight: 'bold',
              }}
            >
              По персонажам
            </button>
          </div>
        </div>

        {/* Список заметок */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: 'var(--spacing-lg)',
          }}
        >
          {notes.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', margin: 'var(--spacing-xl) 0' }}>
              Блокнот пуст. Выделите текст в сцене, чтобы добавить заметку.
            </p>
          ) : notebookView === 'categories' ? (
            categoryKeys.map((category) => {
              const categoryNotes = groupedByCategory[category];
              return (
                <div key={category} style={{ marginBottom: 'var(--spacing-lg)' }}>
                  <h3
                    style={{
                      margin: '0 0 var(--spacing-sm)',
                      color: 'var(--color-text-muted)',
                      fontSize: 'var(--font-size-sm)',
                      fontWeight: 'bold',
                    }}
                  >
                    {CATEGORY_LABELS[category]}
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                    {categoryNotes.map((note) => (
                      <NoteCard key={note.id} note={note} />
                    ))}
                  </div>
                </div>
              );
            })
          ) : (
            Object.entries(groupedByCharacter).map(([charId, charNotes]) => {
              const character = charId === 'none' ? null : CHARACTERS.find((c) => c.id === charId);
              return (
                <div key={charId} style={{ marginBottom: 'var(--spacing-lg)' }}>
                  <h3
                    style={{
                      margin: '0 0 var(--spacing-sm)',
                      color: character ? 'var(--color-accent)' : 'var(--color-text-muted)',
                      fontSize: 'var(--font-size-sm)',
                      fontWeight: 'bold',
                    }}
                  >
                    {character ? character.name : 'Без цели'}
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                    {charNotes.map((note) => (
                      <NoteCard key={note.id} note={note} />
                    ))}
                  </div>
                </div>
              );
            })
          )}

          {/* Отброшенные заметки */}
          {discardedNotes.length > 0 && (
            <div style={{ marginTop: 'var(--spacing-xl)', borderTop: '1px solid var(--color-border)', paddingTop: 'var(--spacing-lg)' }}>
              <h3
                style={{
                  margin: '0 0 var(--spacing-sm)',
                  color: 'var(--color-text-muted)',
                  fontSize: 'var(--font-size-xs)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                Отброшенные ({discardedNotes.length})
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                {discardedNotes.map((note) => (
                  <NoteCard key={note.id} note={note} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Кнопка добавления вручную */}
        <div
          style={{
            padding: 'var(--spacing-md)',
            borderTop: '1px solid var(--color-border)',
          }}
        >
          {showManualInput ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
              <textarea
                value={manualText}
                onChange={(e) => setManualText(e.target.value)}
                placeholder="Введите заметку..."
                style={{
                  width: '100%',
                  minHeight: '80px',
                  padding: 'var(--spacing-sm)',
                  background: 'var(--color-bg-elevated)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--color-text)',
                  fontSize: 'var(--font-size-sm)',
                  resize: 'vertical',
                  fontFamily: 'inherit',
                }}
              />
              <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                <button
                  onClick={handleAddManual}
                  disabled={!manualText.trim()}
                  style={{
                    flex: 1,
                    padding: 'var(--spacing-sm)',
                    background: manualText.trim() ? 'var(--color-accent)' : 'var(--color-bg-elevated)',
                    color: manualText.trim() ? 'var(--color-bg)' : 'var(--color-text-muted)',
                    border: 'none',
                    borderRadius: 'var(--radius-md)',
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: 'bold',
                    cursor: manualText.trim() ? 'pointer' : 'not-allowed',
                  }}
                >
                  Добавить
                </button>
                <button
                  onClick={() => {
                    setShowManualInput(false);
                    setManualText('');
                  }}
                  style={{
                    padding: 'var(--spacing-sm) var(--spacing-md)',
                    background: 'var(--color-bg-elevated)',
                    color: 'var(--color-text)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: 'var(--font-size-sm)',
                  }}
                >
                  Отмена
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowManualInput(true)}
              style={{
                width: '100%',
                padding: 'var(--spacing-md)',
                background: 'var(--color-bg-elevated)',
                color: 'var(--color-accent)',
                border: '1px dashed var(--color-accent)',
                borderRadius: 'var(--radius-md)',
                fontSize: 'var(--font-size-sm)',
                fontWeight: 'bold',
              }}
            >
              + Добавить вручную
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
