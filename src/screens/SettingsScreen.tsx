import { useGameStore } from '../store';
import { AppHeader } from '../components/AppHeader';

export function SettingsScreen() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        padding: 'var(--spacing-lg)',
        background: 'var(--color-bg)',
      }}
    >
      <AppHeader title="⚙️ Настройки" showBack />

      <div style={{ maxWidth: '500px', margin: '0 auto', width: '100%' }}>
        <div
          style={{
            padding: 'var(--spacing-lg)',
            background: 'var(--color-bg-panel)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-border)',
            textAlign: 'center',
          }}
        >
          <p style={{ color: 'var(--color-text-muted)', margin: 0 }}>
            Настройки будут доступны в следующих обновлениях.
          </p>
        </div>
      </div>
    </div>
  );
}
