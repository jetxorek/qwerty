import { useState, useCallback } from 'react';
import { SelectableText } from './SelectableText';
import { useGameStore } from '../store';
import { getCharacterById } from '../data/characters';

interface TextPanelProps {
  speakerId?: string;
  text: string;
  isLastNode: boolean;
}

export function TextPanel({ speakerId, text, isLastNode }: TextPanelProps) {
  const advanceNode = useGameStore((s) => s.advanceNode);
  const setScreen = useGameStore((s) => s.setScreen);
  const addNoteFromSelection = useGameStore((s) => s.addNoteFromSelection);
  const [selection, setSelection] = useState<string | null>(null);
  const [selectionPos, setSelectionPos] = useState<{ x: number; y: number } | null>(null);

  const speaker = speakerId ? getCharacterById(speakerId) : null;

  const handleSelection = useCallback((selectedText: string) => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      const range = sel.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setSelectionPos({
        x: rect.left + rect.width / 2,
        y: rect.top - 10,
      });
    }
    setSelection(selectedText);
  }, []);

  const handleAddToNotebook = useCallback(() => {
    if (selection) {
      addNoteFromSelection(selection);
    }
    setSelection(null);
    setSelectionPos(null);
    window.getSelection()?.removeAllRanges();
  }, [selection, addNoteFromSelection]);

  const handleDismissSelection = useCallback(() => {
    setSelection(null);
    setSelectionPos(null);
  }, []);

  const handleAdvance = useCallback(() => {
    if (isLastNode) {
      setScreen('main_menu');
    } else {
      advanceNode();
    }
  }, [advanceNode, isLastNode, setScreen]);

  const handleEmptySpaceClick = useCallback(() => {
    if (!selection) {
      handleAdvance();
    }
  }, [selection, handleAdvance]);

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: 'var(--spacing-lg)',
        paddingBottom: '120px',
        overflowY: 'auto',
      }}
    >
      {/* Спикер */}
      {speaker && (
        <div
          style={{
            marginBottom: 'var(--spacing-md)',
            padding: 'var(--spacing-sm) var(--spacing-md)',
            background: 'var(--color-bg-elevated)',
            borderRadius: 'var(--radius-md)',
            borderLeft: '3px solid var(--color-accent)',
            display: 'inline-block',
            alignSelf: 'flex-start',
          }}
        >
          <span
            style={{
              color: 'var(--color-accent)',
              fontFamily: 'var(--font-main)',
              fontSize: 'var(--font-size-sm)',
              fontWeight: 'bold',
            }}
          >
            {speaker.name}
          </span>
        </div>
      )}

      {/* Текст */}
      <SelectableText
        onSelection={handleSelection}
        onAdvance={handleAdvance}
        style={{
          color: 'var(--color-text)',
          fontFamily: 'var(--font-main)',
          fontSize: 'var(--font-size-lg)',
          lineHeight: 1.7,
          letterSpacing: '0.01em',
        }}
      >
        {speaker ? `«${text}»` : text}
      </SelectableText>

      {/* Пустое пространство для клика */}
      <div
        onClick={handleEmptySpaceClick}
        style={{
          flex: 1,
          minHeight: '100px',
          cursor: 'pointer',
        }}
      />

      {/* Плавающая кнопка «Продолжить» */}
      <button
        onClick={handleAdvance}
        style={{
          position: 'fixed',
          bottom: '90px',
          right: '20px',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'rgba(201, 168, 76, 0.7)',
          border: '2px solid var(--color-accent)',
          color: 'var(--color-bg)',
          fontSize: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
          zIndex: 10,
        }}
        aria-label={isLastNode ? 'Завершить' : 'Продолжить'}
      >
        {isLastNode ? '✕' : '↓'}
      </button>

      {/* Панель выделения */}
      {selection && selectionPos && (
        <div
          style={{
            position: 'fixed',
            left: Math.max(10, Math.min(selectionPos.x - 100, window.innerWidth - 220)),
            top: Math.max(10, selectionPos.y - 50),
            background: 'var(--color-bg-elevated)',
            border: '1px solid var(--color-accent)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--spacing-sm)',
            display: 'flex',
            gap: 'var(--spacing-sm)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.5)',
            zIndex: 100,
          }}
        >
          <button
            onClick={handleAddToNotebook}
            style={{
              background: 'var(--color-accent)',
              color: 'var(--color-bg)',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              padding: 'var(--spacing-xs) var(--spacing-md)',
              fontSize: 'var(--font-size-xs)',
              fontWeight: 'bold',
              whiteSpace: 'nowrap',
            }}
          >
            📓 В блокнот
          </button>
          <button
            onClick={handleDismissSelection}
            style={{
              background: 'transparent',
              color: 'var(--color-text-muted)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)',
              padding: 'var(--spacing-xs) var(--spacing-sm)',
              fontSize: 'var(--font-size-xs)',
            }}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
