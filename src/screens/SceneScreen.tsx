import { useEffect } from 'react';
import { useGameStore } from '../store';
import { TextPanel } from '../components/TextPanel';
import { CharacterBar } from '../components/CharacterBar';
import { ActionBar } from '../components/ActionBar';
import { Overlays } from '../components/Overlays';
import { AppHeader } from '../components/AppHeader';
import { DEMO_SCENE } from '../data/scene';

export function SceneScreen() {
  const setScreen = useGameStore((s) => s.setScreen);
  const currentSceneId = useGameStore((s) => s.currentSceneId);
  const currentNodeIndex = useGameStore((s) => s.currentNodeIndex);
  const setCurrentSceneId = useGameStore((s) => s.setCurrentSceneId);

  // Инициализация сцены
  useEffect(() => {
    if (!currentSceneId) {
      setCurrentSceneId(DEMO_SCENE.id);
    }
  }, [currentSceneId, setCurrentSceneId]);

  const scene = DEMO_SCENE;
  const currentNode = scene.nodes[currentNodeIndex];

  if (!currentNode) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: 'var(--spacing-lg)',
          background: 'var(--color-bg)',
        }}
      >
        <p style={{ color: 'var(--color-text-muted)' }}>Сцена не найдена.</p>
      </div>
    );
  }

  const isLastNode = currentNodeIndex >= scene.nodes.length - 1;

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: 'var(--color-bg)',
      }}
    >
      {/* Фон-заглушка */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, #0a0a1a 0%, #0f0f2a 50%, #0a0a1a 100%)',
          opacity: 0.5,
          zIndex: 0,
        }}
      />

      <AppHeader title={scene.title} showBack />

      {/* Контент */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          paddingBottom: '80px',
        }}
      >
        <TextPanel
          speakerId={currentNode.speakerId}
          text={currentNode.text}
          isLastNode={isLastNode}
        />
      </div>

      {/* Панель персонажей */}
      <CharacterBar />

      {/* ActionBar (Блокнот, Схема) */}
      <ActionBar />

      {/* Оверлеи */}
      <Overlays />
    </div>
  );
}
