import { useGameStore } from '../store';
import { SCENE_GRAPH } from '../data/sceneGraph';
import { AppHeader } from '../components/AppHeader';
import { SceneIntro } from '../components/SceneIntro';
import { TextPanel } from '../components/TextPanel';
import { BACKGROUND_ASSETS } from '../assets';

export function SceneScreen() {
  const setScreen = useGameStore((s) => s.setScreen);
  const currentSceneId = useGameStore((s) => s.currentSceneId);
  const currentNodeId = useGameStore((s) => s.currentNodeId);
  const isShowingIntro = useGameStore((s) => s.isShowingIntro);
  const dismissIntro = useGameStore((s) => s.dismissIntro);
  
  if (!currentSceneId || !currentNodeId) {
    return <div style={{ padding: 'var(--spacing-lg)' }}>Сцена не загружена.</div>;
  }

  const scene = SCENE_GRAPH[currentSceneId];
  if (!scene) {
    return <div style={{ padding: 'var(--spacing-lg)' }}>Ошибка: сцена {currentSceneId} не найдена.</div>;
  }

  if (isShowingIntro) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <AppHeader title={scene.title} showBack />
        <SceneIntro scene={scene} onStart={dismissIntro} />
      </div>
    );
  }

  const node = scene.nodes[currentNodeId];
  if (!node) {
    return <div style={{ padding: 'var(--spacing-lg)' }}>Ошибка: узел {currentNodeId} не найден.</div>;
  }

  const bgImage = BACKGROUND_ASSETS[scene.background];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppHeader title={scene.title} showBack />
      
      {bgImage && (
        <div style={{ position: 'relative', width: '100%', height: '250px', flexShrink: 0 }}>
          <img src={bgImage} alt={scene.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '100px', background: 'linear-gradient(to bottom, transparent, var(--color-bg))' }} />
        </div>
      )}

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <TextPanel node={node} />
      </div>
    </div>
  );
}
