import type { Note } from '../schemas/note';

export type Screen =
  | 'main_menu'
  | 'tutorial'
  | 'scene'
  | 'daily_menu'
  | 'case_builder'
  | 'settings'
  | 'how_to_play';

export type Overlay = 'none' | 'character_card' | 'notebook' | 'evidence';

export type NotebookView = 'categories' | 'characters';

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

  // Сцена
  currentSceneId: string | null;
  setCurrentSceneId: (id: string | null) => void;
  currentNodeIndex: number;
  setCurrentNodeIndex: (index: number) => void;
  advanceNode: () => void;

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
}
