import { useGameStore } from '../store';
import { CharacterCardOverlay } from './overlays/CharacterCardOverlay';
import { NotebookOverlay } from './overlays/NotebookOverlay';
import { CharacterMapOverlay } from './overlays/CharacterMapOverlay';

export function Overlays() {
  const overlay = useGameStore((s) => s.overlay);

  switch (overlay) {
    case 'character_card':
      return <CharacterCardOverlay />;
    case 'notebook':
      return <NotebookOverlay />;
    case 'character_map':
      return <CharacterMapOverlay />;
    default:
      return null;
  }
}
