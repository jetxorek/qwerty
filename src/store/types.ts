export type Screen =
  | 'main_menu'
  | 'tutorial'
  | 'scene'
  | 'daily_menu'
  | 'case_builder'
  | 'settings'
  | 'how_to_play';

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
}
