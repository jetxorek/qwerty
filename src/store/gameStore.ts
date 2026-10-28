import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { GameState, Overlay, Screen } from './types';
import { DEMO_SCENE } from '../data/scene';

function makeInitialData() {
  return {
    currentScreen: 'main_menu' as Screen,
    tutorialStepsSeen: [] as string[],
    tutorialContext: null as string | null,
    currentSceneId: null as string | null,
    currentNodeIndex: 0,
    activeSpeaker: null as string | null,
    overlay: 'none' as Overlay,
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

      setCurrentSceneId: (id: string | null) => {
        set({ currentSceneId: id, currentNodeIndex: 0 });
      },

      setCurrentNodeIndex: (index: number) => {
        set({ currentNodeIndex: index });
      },

      advanceNode: () => {
        const { currentSceneId, currentNodeIndex } = get();
        if (!currentSceneId) return;
        const scene = DEMO_SCENE;
        if (currentNodeIndex < scene.nodes.length - 1) {
          set({ currentNodeIndex: currentNodeIndex + 1 });
        }
      },

      setActiveSpeaker: (id: string | null) => {
        set({ activeSpeaker: id });
      },

      setOverlay: (overlay: Overlay) => {
        set({ overlay });
      },
    }),
    {
      name: 'nile-game-storage',
      partialize: (state) => ({
        tutorialStepsSeen: state.tutorialStepsSeen,
        currentSceneId: state.currentSceneId,
        currentNodeIndex: state.currentNodeIndex,
      }),
    }
  )
);
