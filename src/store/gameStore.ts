import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { GameState, NotebookView, Overlay, Screen } from './types';
import type { Note } from '../schemas/note';
import type { PlayerConnection } from '../schemas/connection';
import { SCENE_GRAPH } from '../data/sceneGraph';
import { findNoteInMatrix } from '../data/noteMatrix';

function makeInitialData() {
  return {
    currentScreen: 'main_menu' as Screen,
    tutorialStepsSeen: [] as string[],
    tutorialContext: null as string | null,
    currentSceneId: null as string | null,
    currentNodeId: null as string | null,
    isShowingIntro: false,
    activeSpeaker: null as string | null,
    overlay: 'none' as Overlay,
    notes: [] as Note[],
    notebookView: 'categories' as NotebookView,
    connections: [] as PlayerConnection[],
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

      startStory: (sceneId: string) => {
        const scene = SCENE_GRAPH[sceneId];
        if (!scene) return;
        
        set({
          currentSceneId: sceneId,
          currentNodeId: scene.startNodeId,
          isShowingIntro: true,
          currentScreen: 'scene',
          notes: [],
        });
      },

      dismissIntro: () => {
        set({ isShowingIntro: false });
      },

      advanceNode: () => {
        const { currentSceneId, currentNodeId, isShowingIntro } = get();
        
        // Если показывается интро, ждём dismissIntro
        if (isShowingIntro) return;
        
        if (!currentSceneId || !currentNodeId) return;
        
        const scene = SCENE_GRAPH[currentSceneId];
        if (!scene) return;
        
        const currentNode = scene.nodes[currentNodeId];
        if (!currentNode) return;
        
        // Если у узла есть next (narration или dialogue), переходим к нему
        if (currentNode.type === 'narration' || currentNode.type === 'dialogue') {
          if (currentNode.next) {
            set({ currentNodeId: currentNode.next });
            return;
          }
        }
        
        // Если next нет (или это choice), проверяем nextSceneId
        if (scene.nextSceneId) {
          const nextScene = SCENE_GRAPH[scene.nextSceneId];
          if (nextScene) {
            set({
              currentSceneId: scene.nextSceneId,
              currentNodeId: nextScene.startNodeId,
              isShowingIntro: true,
            });
            return;
          }
        }
        
        // Конец контента — возвращаемся в меню
        set({ currentScreen: 'main_menu' });
      },

      selectChoice: (nextNodeId: string) => {
        set({ currentNodeId: nextNodeId });
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

      addConnection: (from: string, to: string, type: PlayerConnection['type']) => {
        // from !== to
        if (from === to) return;
        const existing = get().connections;
        // Проверка на дубликат (в обе стороны)
        const isDuplicate = existing.some(
          (c) =>
            (c.from === from && c.to === to) ||
            (c.from === to && c.to === from)
        );
        if (isDuplicate) return;

        const newConnection: PlayerConnection = {
          id: `conn_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
          from,
          to,
          type,
        };
        set({ connections: [...existing, newConnection] });
      },

      removeConnection: (id: string) => {
        const connections = get().connections.filter((c) => c.id !== id);
        set({ connections });
      },
    }),
    {
      name: 'nile-game-storage',
      partialize: (state) => ({
        tutorialStepsSeen: state.tutorialStepsSeen,
        currentSceneId: state.currentSceneId,
        currentNodeId: state.currentNodeId,
        notes: state.notes,
        connections: state.connections,
      }),
    }
  )
);
