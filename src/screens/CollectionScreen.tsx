import { useGameStore } from '../store';
import { AppHeader } from '../components/AppHeader';

export function CollectionScreen() {
  const setScreen = useGameStore((s) => s.setScreen);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppHeader title="Коллекция детективов" showBack />
      <div style={{ padding: 'var(--spacing-lg)', textAlign: 'center', marginTop: 'var(--spacing-xl)' }}>
        <h2>Здесь будут новые дела</h2>
        <p style={{ color: 'var(--color-text-muted)', marginTop: 'var(--spacing-md)' }}>
          Скоро вы сможете играть в другие детективные истории на этой платформе.
        </p>
      </div>
    </div>
  );
}
