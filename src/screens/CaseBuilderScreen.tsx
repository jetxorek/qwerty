import { useState } from 'react';
import { useGameStore } from '../store';
import type { CaseDraft, CaseCharacter, KeyEvidence } from '../schemas/caseDraft';
import { validateCaseDraft } from '../engine/caseValidator';
import { HowToPlayBuilderOverlay } from '../components/overlays/HowToPlayBuilderOverlay';
import { AppHeader } from '../components/AppHeader';

const STORAGE_KEY = 'mfe_custom_case_draft';

function generateId(): string {
  return `char_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

export function CaseBuilderScreen() {
  const setScreen = useGameStore((s) => s.setScreen);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  // Состояние формы
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [characters, setCharacters] = useState<CaseCharacter[]>([
    { id: generateId(), name: '', role: 'suspect', description: '', motive: '', alibi: '' },
    { id: generateId(), name: '', role: 'suspect', description: '', motive: '', alibi: '' },
    { id: generateId(), name: '', role: 'suspect', description: '', motive: '', alibi: '' },
  ]);
  const [murdererId, setMurdererId] = useState('');
  const [keyEvidence, setKeyEvidence] = useState<KeyEvidence[]>([
    { id: generateId(), name: '', description: '' },
  ]);

  const handleAddCharacter = () => {
    setCharacters([
      ...characters,
      { id: generateId(), name: '', role: 'suspect', description: '', motive: '', alibi: '' },
    ]);
  };

  const handleRemoveCharacter = (id: string) => {
    if (characters.length <= 1) return;
    setCharacters(characters.filter((c) => c.id !== id));
    if (murdererId === id) {
      setMurdererId('');
    }
  };

  const handleUpdateCharacter = (id: string, field: keyof CaseCharacter, value: string) => {
    setCharacters(
      characters.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const handleAddEvidence = () => {
    setKeyEvidence([...keyEvidence, { id: generateId(), name: '', description: '' }]);
  };

  const handleRemoveEvidence = (id: string) => {
    if (keyEvidence.length <= 1) return;
    setKeyEvidence(keyEvidence.filter((e) => e.id !== id));
  };

  const handleUpdateEvidence = (id: string, field: keyof KeyEvidence, value: string) => {
    setKeyEvidence(
      keyEvidence.map((e) => (e.id === id ? { ...e, [field]: value } : e))
    );
  };

  const handleSave = () => {
    const draft: CaseDraft = {
      title,
      description,
      characters,
      murdererId,
      keyEvidence,
    };

    const validationErrors = validateCaseDraft(draft);

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Сохранение в localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    setErrors([]);
    alert('Черновик сохранен!');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: 'var(--color-bg)',
        position: 'relative',
      }}
    >
      <AppHeader
        title="Создать детектив"
        showBack
        rightContent={
          <button
            onClick={() => setShowHowToPlay(true)}
            style={{
              background: 'transparent',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text)',
              padding: 'var(--spacing-sm) var(--spacing-md)',
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--font-size-sm)',
            }}
          >
            ❓
          </button>
        }
      />

      {/* Контент формы */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: 'var(--spacing-lg)',
          paddingBottom: '120px',
        }}
      >
        <div
          style={{
            maxWidth: '600px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--spacing-xl)',
          }}
        >
          {/* Блок "Обложка" */}
          <section>
            <h2
              style={{
                color: 'var(--color-accent)',
                fontFamily: 'var(--font-main)',
                fontSize: 'var(--font-size-lg)',
                marginBottom: 'var(--spacing-md)',
              }}
            >
              📖 Обложка
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
              <div>
                <label
                  style={{
                    display: 'block',
                    color: 'var(--color-text-muted)',
                    fontSize: 'var(--font-size-sm)',
                    marginBottom: 'var(--spacing-xs)',
                  }}
                >
                  Название дела *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Например: Убийство в Восточном экспрессе"
                  style={{
                    width: '100%',
                    padding: 'var(--spacing-md)',
                    background: 'var(--color-bg-panel)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--color-text)',
                    fontSize: 'var(--font-size-md)',
                    fontFamily: 'inherit',
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    color: 'var(--color-text-muted)',
                    fontSize: 'var(--font-size-sm)',
                    marginBottom: 'var(--spacing-xs)',
                  }}
                >
                  Краткое описание *
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Опишите завязку вашей истории..."
                  rows={4}
                  style={{
                    width: '100%',
                    padding: 'var(--spacing-md)',
                    background: 'var(--color-bg-panel)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--color-text)',
                    fontSize: 'var(--font-size-md)',
                    fontFamily: 'inherit',
                    resize: 'vertical',
                  }}
                />
              </div>
            </div>
          </section>

          {/* Блок "Персонажи" */}
          <section>
            <h2
              style={{
                color: 'var(--color-accent)',
                fontFamily: 'var(--font-main)',
                fontSize: 'var(--font-size-lg)',
                marginBottom: 'var(--spacing-md)',
              }}
            >
              🎭 Персонажи ({characters.length})
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
              {characters.map((char, index) => (
                <div
                  key={char.id}
                  style={{
                    padding: 'var(--spacing-lg)',
                    background: 'var(--color-bg-panel)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-lg)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 'var(--spacing-md)',
                    }}
                  >
                    <span
                      style={{
                        color: 'var(--color-text-muted)',
                        fontSize: 'var(--font-size-sm)',
                      }}
                    >
                      Персонаж #{index + 1}
                    </span>
                    <button
                      onClick={() => handleRemoveCharacter(char.id)}
                      disabled={characters.length <= 1}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: characters.length <= 1 ? 'var(--color-border)' : 'var(--color-danger)',
                        fontSize: '1.2rem',
                        cursor: characters.length <= 1 ? 'not-allowed' : 'pointer',
                      }}
                      aria-label="Удалить персонажа"
                    >
                      🗑
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                    <input
                      type="text"
                      value={char.name}
                      onChange={(e) => handleUpdateCharacter(char.id, 'name', e.target.value)}
                      placeholder="Имя *"
                      style={{
                        padding: 'var(--spacing-sm)',
                        background: 'var(--color-bg-elevated)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-md)',
                        color: 'var(--color-text)',
                        fontSize: 'var(--font-size-sm)',
                        fontFamily: 'inherit',
                      }}
                    />

                    <select
                      value={char.role}
                      onChange={(e) => handleUpdateCharacter(char.id, 'role', e.target.value)}
                      style={{
                        padding: 'var(--spacing-sm)',
                        background: 'var(--color-bg-elevated)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-md)',
                        color: 'var(--color-text)',
                        fontSize: 'var(--font-size-sm)',
                        fontFamily: 'inherit',
                      }}
                    >
                      <option value="suspect">Подозреваемый</option>
                      <option value="victim">Жертва</option>
                      <option value="detective">Детектив</option>
                    </select>

                    <input
                      type="text"
                      value={char.motive}
                      onChange={(e) => handleUpdateCharacter(char.id, 'motive', e.target.value)}
                      placeholder="Мотив *"
                      style={{
                        padding: 'var(--spacing-sm)',
                        background: 'var(--color-bg-elevated)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-md)',
                        color: 'var(--color-text)',
                        fontSize: 'var(--font-size-sm)',
                        fontFamily: 'inherit',
                      }}
                    />

                    <input
                      type="text"
                      value={char.alibi}
                      onChange={(e) => handleUpdateCharacter(char.id, 'alibi', e.target.value)}
                      placeholder="Алиби *"
                      style={{
                        padding: 'var(--spacing-sm)',
                        background: 'var(--color-bg-elevated)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-md)',
                        color: 'var(--color-text)',
                        fontSize: 'var(--font-size-sm)',
                        fontFamily: 'inherit',
                      }}
                    />
                  </div>
                </div>
              ))}

              <button
                onClick={handleAddCharacter}
                style={{
                  padding: 'var(--spacing-md)',
                  background: 'transparent',
                  border: '2px dashed var(--color-accent)',
                  borderRadius: 'var(--radius-lg)',
                  color: 'var(--color-accent)',
                  fontSize: 'var(--font-size-md)',
                  fontWeight: 'bold',
                }}
              >
                + Добавить персонажа
              </button>
            </div>
          </section>

          {/* Блок "Развязка" */}
          <section>
            <h2
              style={{
                color: 'var(--color-accent)',
                fontFamily: 'var(--font-main)',
                fontSize: 'var(--font-size-lg)',
                marginBottom: 'var(--spacing-md)',
              }}
            >
              🔍 Развязка
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
              <div>
                <label
                  style={{
                    display: 'block',
                    color: 'var(--color-text-muted)',
                    fontSize: 'var(--font-size-sm)',
                    marginBottom: 'var(--spacing-xs)',
                  }}
                >
                  Кто убийца? *
                </label>
                <select
                  value={murdererId}
                  onChange={(e) => setMurdererId(e.target.value)}
                  style={{
                    width: '100%',
                    padding: 'var(--spacing-md)',
                    background: 'var(--color-bg-panel)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--color-text)',
                    fontSize: 'var(--font-size-md)',
                    fontFamily: 'inherit',
                  }}
                >
                  <option value="">Выберите убийцу...</option>
                  {characters.map((char) => (
                    <option key={char.id} value={char.id}>
                      {char.name || `Персонаж #${characters.indexOf(char) + 1}`}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    color: 'var(--color-text-muted)',
                    fontSize: 'var(--font-size-sm)',
                    marginBottom: 'var(--spacing-xs)',
                  }}
                >
                  Ключевая улика *
                </label>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                  {keyEvidence.map((evidence, index) => (
                    <div
                      key={evidence.id}
                      style={{
                        display: 'flex',
                        gap: 'var(--spacing-sm)',
                        alignItems: 'flex-start',
                      }}
                    >
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xs)' }}>
                        <input
                          type="text"
                          value={evidence.name}
                          onChange={(e) => handleUpdateEvidence(evidence.id, 'name', e.target.value)}
                          placeholder={`Улика #${index + 1}: Название`}
                          style={{
                            padding: 'var(--spacing-sm)',
                            background: 'var(--color-bg-panel)',
                            border: '1px solid var(--color-border)',
                            borderRadius: 'var(--radius-md)',
                            color: 'var(--color-text)',
                            fontSize: 'var(--font-size-sm)',
                            fontFamily: 'inherit',
                          }}
                        />
                        <input
                          type="text"
                          value={evidence.description}
                          onChange={(e) => handleUpdateEvidence(evidence.id, 'description', e.target.value)}
                          placeholder="Описание"
                          style={{
                            padding: 'var(--spacing-sm)',
                            background: 'var(--color-bg-panel)',
                            border: '1px solid var(--color-border)',
                            borderRadius: 'var(--radius-md)',
                            color: 'var(--color-text)',
                            fontSize: 'var(--font-size-sm)',
                            fontFamily: 'inherit',
                          }}
                        />
                      </div>
                      <button
                        onClick={() => handleRemoveEvidence(evidence.id)}
                        disabled={keyEvidence.length <= 1}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: keyEvidence.length <= 1 ? 'var(--color-border)' : 'var(--color-danger)',
                          fontSize: '1.2rem',
                          cursor: keyEvidence.length <= 1 ? 'not-allowed' : 'pointer',
                          marginTop: 'var(--spacing-sm)',
                        }}
                        aria-label="Удалить улику"
                      >
                        🗑
                      </button>
                    </div>
                  ))}

                  <button
                    onClick={handleAddEvidence}
                    style={{
                      padding: 'var(--spacing-sm)',
                      background: 'transparent',
                      border: '1px dashed var(--color-border)',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--color-text-muted)',
                      fontSize: 'var(--font-size-sm)',
                    }}
                  >
                    + Добавить улику
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Ошибки валидации */}
          {errors.length > 0 && (
            <div
              style={{
                padding: 'var(--spacing-lg)',
                background: 'rgba(168, 50, 50, 0.1)',
                border: '1px solid var(--color-danger)',
                borderRadius: 'var(--radius-lg)',
              }}
            >
              <h3
                style={{
                  margin: '0 0 var(--spacing-sm)',
                  color: 'var(--color-danger)',
                  fontSize: 'var(--font-size-md)',
                }}
              >
                Исправьте ошибки:
              </h3>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: 'var(--spacing-lg)',
                  color: 'var(--color-text)',
                  fontSize: 'var(--font-size-sm)',
                  lineHeight: 1.6,
                }}
              >
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Кнопка сохранения (фиксированная) */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          padding: 'var(--spacing-lg)',
          background: 'linear-gradient(to top, var(--color-bg) 80%, transparent)',
        }}
      >
        <button
          onClick={handleSave}
          style={{
            width: '100%',
            maxWidth: '600px',
            margin: '0 auto',
            display: 'block',
            padding: 'var(--spacing-lg)',
            background: 'var(--color-accent)',
            color: 'var(--color-bg)',
            border: 'none',
            borderRadius: 'var(--radius-lg)',
            fontSize: 'var(--font-size-lg)',
            fontWeight: 'bold',
            fontFamily: 'var(--font-main)',
            minHeight: '56px',
          }}
        >
          💾 Сохранить черновик
        </button>
      </div>

      {/* Модалка "Как это работает" */}
      {showHowToPlay && <HowToPlayBuilderOverlay onClose={() => setShowHowToPlay(false)} />}
    </div>
  );
}
