import { useState, useMemo } from 'react';
import { useGameStore } from '../../store';
import { CHARACTERS, getCharacterById } from '../../data/characters';
import type { ConnectionType } from '../../schemas/connection';

const CONNECTION_TYPE_LABELS: Record<ConnectionType, string> = {
  family: '👨‍👩‍👧‍👦 Семья',
  love: '💕 Любовь',
  service: '💼 Служба',
  debt: '💰 Долг',
  enmity: '⚔️ Вражда',
  other: '🔗 Другое',
};

const CONNECTION_TYPE_COLORS: Record<ConnectionType, string> = {
  family: '#c9a84c',
  love: '#e91e63',
  service: '#2196f3',
  debt: '#ff9800',
  enmity: '#a83232',
  other: '#8a8a9a',
};

interface CharacterPosition {
  id: string;
  name: string;
  x: number;
  y: number;
}

export function CharacterMapOverlay() {
  const setOverlay = useGameStore((s) => s.setOverlay);
  const connections = useGameStore((s) => s.connections);
  const addConnection = useGameStore((s) => s.addConnection);
  const removeConnection = useGameStore((s) => s.removeConnection);

  const [selectedFirst, setSelectedFirst] = useState<string | null>(null);
  const [selectedSecond, setSelectedSecond] = useState<string | null>(null);
  const [connectionType, setConnectionType] = useState<ConnectionType>('other');

  // Персонажи для графа (все, кроме Пирогова)
  const mapCharacters = useMemo(() => {
    return CHARACTERS.filter((c) => c.id !== 'char_01');
  }, []);

  // Расчёт позиций по кругу
  const positions = useMemo<CharacterPosition[]>(() => {
    const centerX = 150;
    const centerY = 150;
    const radius = 110;
    const count = mapCharacters.length;

    return mapCharacters.map((char, index) => {
      const angle = (index / count) * 2 * Math.PI - Math.PI / 2;
      return {
        id: char.id,
        name: char.name,
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
      };
    });
  }, [mapCharacters]);

  const handleCharacterClick = (charId: string) => {
    if (!selectedFirst) {
      setSelectedFirst(charId);
    } else if (!selectedSecond && charId !== selectedFirst) {
      setSelectedSecond(charId);
    } else {
      // Сброс выбора
      setSelectedFirst(charId);
      setSelectedSecond(null);
    }
  };

  const handleCreateConnection = () => {
    if (selectedFirst && selectedSecond) {
      addConnection(selectedFirst, selectedSecond, connectionType);
      setSelectedFirst(null);
      setSelectedSecond(null);
      setConnectionType('other');
    }
  };

  const handleCancel = () => {
    setSelectedFirst(null);
    setSelectedSecond(null);
  };

  const handleClose = () => {
    setOverlay('none');
  };

  const firstChar = selectedFirst ? getCharacterById(selectedFirst) : null;
  const secondChar = selectedSecond ? getCharacterById(selectedSecond) : null;

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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2
              style={{
                margin: 0,
                color: 'var(--color-accent)',
                fontFamily: 'var(--font-main)',
                fontSize: 'var(--font-size-xl)',
              }}
            >
              🔗 Схема связей
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
          <p
            style={{
              margin: 'var(--spacing-sm) 0 0',
              color: 'var(--color-text-muted)',
              fontSize: 'var(--font-size-sm)',
              fontStyle: 'italic',
            }}
          >
            Выберите двух персонажей, чтобы связать их
          </p>
        </div>

        {/* Граф */}
        <div
          style={{
            padding: 'var(--spacing-lg)',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '300px',
              height: '300px',
            }}
          >
            {/* SVG с линиями */}
            <svg
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
              }}
            >
              {connections.map((conn) => {
                const fromPos = positions.find((p) => p.id === conn.from);
                const toPos = positions.find((p) => p.id === conn.to);
                if (!fromPos || !toPos) return null;

                return (
                  <line
                    key={conn.id}
                    x1={fromPos.x}
                    y1={fromPos.y}
                    x2={toPos.x}
                    y2={toPos.y}
                    stroke={CONNECTION_TYPE_COLORS[conn.type]}
                    strokeWidth="2"
                    strokeOpacity="0.7"
                  />
                );
              })}
            </svg>

            {/* Персонажи */}
            {positions.map((pos) => {
              const isSelected = pos.id === selectedFirst || pos.id === selectedSecond;
              const char = getCharacterById(pos.id);
              if (!char) return null;

              return (
                <button
                  key={pos.id}
                  onClick={() => handleCharacterClick(pos.id)}
                  style={{
                    position: 'absolute',
                    left: `${pos.x}px`,
                    top: `${pos.y}px`,
                    transform: 'translate(-50%, -50%)',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: isSelected ? 'var(--color-accent)' : 'var(--color-bg-elevated)',
                    border: `2px solid ${isSelected ? 'var(--color-accent)' : 'var(--color-border)'}`,
                    color: isSelected ? 'var(--color-bg)' : 'var(--color-text)',
                    fontSize: 'var(--font-size-xs)',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    padding: '2px',
                    lineHeight: 1.1,
                    transition: 'all var(--transition-fast)',
                  }}
                  title={char.name}
                >
                  {char.name.split(' ').map((w) => w[0]).join('').slice(0, 2)}
                </button>
              );
            })}
          </div>
        </div>

        {/* Панель создания связи */}
        {selectedFirst && selectedSecond && firstChar && secondChar && (
          <div
            style={{
              padding: 'var(--spacing-lg)',
              background: 'var(--color-bg-elevated)',
              borderTop: '1px solid var(--color-border)',
              borderBottom: '1px solid var(--color-border)',
            }}
          >
            <p
              style={{
                margin: '0 0 var(--spacing-md)',
                color: 'var(--color-text)',
                fontSize: 'var(--font-size-sm)',
                textAlign: 'center',
              }}
            >
              Связать <strong>{firstChar.name}</strong> и <strong>{secondChar.name}</strong>
            </p>

            <select
              value={connectionType}
              onChange={(e) => setConnectionType(e.target.value as ConnectionType)}
              style={{
                width: '100%',
                padding: 'var(--spacing-sm)',
                background: 'var(--color-bg-panel)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--color-text)',
                fontSize: 'var(--font-size-sm)',
                marginBottom: 'var(--spacing-md)',
              }}
            >
              {Object.entries(CONNECTION_TYPE_LABELS).map(([type, label]) => (
                <option key={type} value={type}>
                  {label}
                </option>
              ))}
            </select>

            <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
              <button
                onClick={handleCreateConnection}
                style={{
                  flex: 1,
                  padding: 'var(--spacing-sm)',
                  background: 'var(--color-accent)',
                  color: 'var(--color-bg)',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: 'bold',
                }}
              >
                Связать
              </button>
              <button
                onClick={handleCancel}
                style={{
                  padding: 'var(--spacing-sm) var(--spacing-md)',
                  background: 'var(--color-bg-panel)',
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
        )}

        {/* Список связей */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: 'var(--spacing-lg)',
          }}
        >
          {connections.length === 0 ? (
            <p
              style={{
                textAlign: 'center',
                color: 'var(--color-text-muted)',
                margin: 'var(--spacing-lg) 0',
                fontSize: 'var(--font-size-sm)',
              }}
            >
              Связей пока нет. Выберите двух персонажей на графе.
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
              {connections.map((conn) => {
                const fromChar = getCharacterById(conn.from);
                const toChar = getCharacterById(conn.to);
                if (!fromChar || !toChar) return null;

                return (
                  <div
                    key={conn.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: 'var(--spacing-sm) var(--spacing-md)',
                      background: 'var(--color-bg-elevated)',
                      borderRadius: 'var(--radius-md)',
                      border: `1px solid ${CONNECTION_TYPE_COLORS[conn.type]}33`,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', flex: 1 }}>
                      <span style={{ color: 'var(--color-text)', fontSize: 'var(--font-size-sm)' }}>
                        {fromChar.name} — {toChar.name}
                      </span>
                      <span
                        style={{
                          fontSize: 'var(--font-size-xs)',
                          color: CONNECTION_TYPE_COLORS[conn.type],
                          background: `${CONNECTION_TYPE_COLORS[conn.type]}22`,
                          padding: '2px 6px',
                          borderRadius: 'var(--radius-sm)',
                        }}
                      >
                        {CONNECTION_TYPE_LABELS[conn.type]}
                      </span>
                    </div>
                    <button
                      onClick={() => removeConnection(conn.id)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--color-danger)',
                        fontSize: '1rem',
                        cursor: 'pointer',
                        padding: 'var(--spacing-xs)',
                      }}
                      aria-label="Удалить связь"
                    >
                      ✕
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
