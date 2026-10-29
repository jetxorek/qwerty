import type { Note } from '../schemas/note';
import type { PlayerConnection } from '../schemas/connection';
import type { AccusationResult } from '../schemas/accusation';

export type Screen =
  | 'main_menu'
  | 'tutorial'
  | 'scene'
  | 'daily_menu'
  | 'case_builder'
  | 'settings'
  | 'how_to_play'
  | 'accusation_result';

export type Overlay = 'none' | 'character_card' | 'notebook' | 'evidence' | 'character_map';

export type NotebookView = 'categories' | 'characters';

// Старые типы для обратной совместимости (используются в scene.ts)
export interface SceneNode {
  id: string;
  speakerId?: string;
  text: string;
  nextNodeId?: string;
}

export interface Scene {
  id: string;
  title: string;
  backgroundId?: string;
  nodes: SceneNode[];
}

export interface GameState {
  // Навигация
  currentScreen: Screen;
  setScreen: (screen: Screen) => void;

  // Онбординг
  tutorialStepsSeen: string[];
  markTutorialSeen: (step: string) => void;
  hasSeenTutorial: (step: string) => boolean;

  // Контекст туториала
  tutorialContext: string | null;
  setTutorialContext: (context: string | null) => void;

  // Сцена (граф сцен)
  currentSceneId: string | null;
  currentNodeId: string | null;
  isShowingIntro: boolean;
  startStory: (sceneId: string) => void;
  dismissIntro: () => void;
  advanceNode: () => void;
  selectChoice: (nextNodeId: string) => void;

  // Активный спикер (для карточки персонажа)
  activeSpeaker: string | null;
  setActiveSpeaker: (id: string | null) => void;

  // Оверлеи
  overlay: Overlay;
  setOverlay: (overlay: Overlay) => void;

  // Блокнот
  notes: Note[];
  addNoteFromSelection: (text: string) => void;
  addPersonalNote: (text: string) => void;
  toggleNoteImportant: (id: string) => void;
  toggleNoteDiscarded: (id: string) => void;
  removeNote: (id: string) => void;

  // Вид блокнота
  notebookView: NotebookView;
  setNotebookView: (view: NotebookView) => void;

  // Связи между персонажами
  connections: PlayerConnection[];
  addConnection: (from: string, to: string, type: PlayerConnection['type']) => void;
  removeConnection: (id: string) => void;

  // Обвинение
  accusationResult: AccusationResult | null;
  submitAccusation: (culpritId: string) => void;
  resetAccusation: () => void;
}
