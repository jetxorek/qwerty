import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { GameState, NotebookView, Overlay, Screen } from './types';
import type { Note } from '../schemas/note';
import { DEMO_SCENE } from '../data/scene';
import { findNoteInMatrix } from '../data/noteMatrix';

function makeInitialData() {
  return {
    currentScreen: 'main_menu' as Screen,
    tutorialStepsSeen: [] as string[],
    tutorialContext: null as string | null,
    currentSceneId: null as string | null,
    currentNodeIndex: 0,
    activeSpeaker: null as string | null,
    overlay: 'none' as Overlay,
    notes: [] as Note[],
    notebookView: 'categories' as NotebookView,
  };
}

let noteCounter = 0;
function generateNoteId(): string {
  noteCounter += 1;
  return `note_${Date.now()}_${noteCounter}`;
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

      addNoteFromSelection: (text: string) => {
        const existing = get().notes;
        // Проверяем, нет ли уже такой заметки
        if (existing.some((n) => n.text === text)) {
          return;
        }

        const matrixEntry = findNoteInMatrix(text);
        let newNote: Note;

        if (matrixEntry) {
          // Нашли в матрице — добавляем как улику
          newNote = {
            ...matrixEntry,
            isPersonal: false,
            important: false,
            discarded: false,
          };
        } else {
          // Не нашли — личная заметка
          newNote = {
            id: generateNoteId(),
            text,
            statement: text,
            category: 'other',
            target: null,
            isPersonal: true,
            important: false,
            discarded: false,
            truth: 'plausible',
          };
        }

        set({ notes: [...existing, newNote] });
      },

      addPersonalNote: (text: string) => {
        const existing = get().notes;
        const newNote: Note = {
          id: generateNoteId(),
          text,
          statement: text,
          category: 'other',
          target: null,
          isPersonal: true,
          important: false,
          discarded: false,
          truth: 'plausible',
        };
        set({ notes: [...existing, newNote] });
      },

      toggleNoteImportant: (id: string) => {
        const notes = get().notes.map((n) =>
          n.id === id ? { ...n, important: !n.important } : n
        );
        set({ notes });
      },

      toggleNoteDiscarded: (id: string) => {
        const notes = get().notes.map((n) =>
          n.id === id ? { ...n, discarded: !n.discarded } : n
        );
        set({ notes });
      },

      removeNote: (id: string) => {
        const notes = get().notes.filter((n) => n.id !== id);
        set({ notes });
      },

      setNotebookView: (view: NotebookView) => {
        set({ notebookView: view });
      },
    }),
    {
      name: 'nile-game-storage',
      partialize: (state) => ({
        tutorialStepsSeen: state.tutorialStepsSeen,
        currentSceneId: state.currentSceneId,
        currentNodeIndex: state.currentNodeIndex,
        notes: state.notes,
      }),
    }
  )
);
