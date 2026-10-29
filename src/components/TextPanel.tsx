import { useGameStore } from '../store';
import { SelectableText } from './SelectableText';
import { getCharacterById } from '../data/characters';
import type { SceneNode } from '../schemas/scene';

interface TextPanelProps {
  node: SceneNode;
}

export function TextPanel({ node }: TextPanelProps) {
  const advanceNode = useGameStore((s) => s.advanceNode);
  const selectChoice = useGameStore((s) => s.selectChoice);
  const addNoteFromSelection = useGameStore((s) => s.addNoteFromSelection);

  if (node.type === 'choice') {
    return (
      <div style={{ padding: 'var(--spacing-lg)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
        <p style={{ color: 'var(--color-text)', fontSize: '1.1rem', marginBottom: 'var(--spacing-sm)' }}>
          {node.prompt}
        </p>
        {node.options.map((opt) => (
          <button
            key={opt.nextNodeId}
            onClick={() => selectChoice(opt.nextNodeId)}
            style={{
              padding: 'var(--spacing-md)',
              background: 'var(--color-bg-panel)',
              color: 'var(--color-text)',
              border: '1px solid var(--color-accent)',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              textAlign: 'left',
              fontSize: '1rem',
            }}
          >
            {opt.text}
          </button>
        ))}
      </div>
    );
  }

  // Обработка narration и dialogue
  const isDialogue = node.type === 'dialogue';
  const speakerId = isDialogue ? node.speakerId : undefined;
  const speaker = speakerId ? getCharacterById(speakerId) : null;

  return (
    <div style={{ padding: 'var(--spacing-lg)', flex: 1, display: 'flex', flexDirection: 'column' }}>
      {isDialogue && speaker && (
        <div style={{ color: 'var(--color-accent)', fontWeight: 'bold', marginBottom: 'var(--spacing-sm)' }}>
          {speaker.name}
        </div>
      )}
      
      <SelectableText 
        onSelection={addNoteFromSelection}
        onAdvance={advanceNode}
        style={{
          color: 'var(--color-text)',
          fontFamily: 'var(--font-main)',
          fontSize: 'var(--font-size-lg)',
          lineHeight: 1.7,
          letterSpacing: '0.01em',
        }}
      >
        {isDialogue ? `«${node.text}»` : node.text}
      </SelectableText>
      
      <button
        onClick={advanceNode}
        style={{
          marginTop: 'auto',
          alignSelf: 'flex-end',
          padding: 'var(--spacing-sm) var(--spacing-md)',
          background: 'transparent',
          color: 'var(--color-text-muted)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-md)',
          cursor: 'pointer',
          opacity: 0.7,
        }}
      >
        Далее →
      </button>
    </div>
  );
}
