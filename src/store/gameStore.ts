import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { GameState, Screen } from './types';

function makeInitialData() {
  return {
    currentScreen: 'main_menu' as Screen,
    tutorialStepsSeen: [] as string[],
    tutorialContext: null as string | null,
  };
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      ...makeInitialData(),

      setScreen: (screen: Screen) => {
        set({ currentScreen: screen });
      },

      markTutorialSeen: (step: string) => {
        const current = get().tutorialStepsSeen;
        if (!current.includes(step)) {
          set({ tutorialStepsSeen: [...current, step] });
        }
      },

      hasSeenTutorial: (step: string) => {
        return get().tutorialStepsSeen.includes(step);
      },

      setTutorialContext: (context: string | null) => {
        set({ tutorialContext: context });
      },
    }),
    {
      name: 'nile-game-storage',
      partialize: (state) => ({
        tutorialStepsSeen: state.tutorialStepsSeen,
      }),
    }
  )
);
