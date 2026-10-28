import { useGameStore } from '../store';

export function HowToPlayScreen() {
  const setScreen = useGameStore((s) => s.setScreen);

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
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-xl)' }}>
        <button
          onClick={() => setScreen('main_menu')}
          style={{
            background: 'transparent',
            border: '1px solid var(--color-border)',
            color: 'var(--color-text)',
            padding: 'var(--spacing-sm) var(--spacing-md)',
            borderRadius: 'var(--radius-md)',
            fontSize: 'var(--font-size-md)',
          }}
        >
          ← Назад
        </button>
        <h1 style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-main)', fontSize: 'var(--font-size-xl)', margin: 0 }}>
          ❓ Как играть
        </h1>
      </div>

      <div style={{ maxWidth: '500px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
        <div style={{ padding: 'var(--spacing-lg)', background: 'var(--color-bg-panel)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
          <h2 style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-main)', marginTop: 0 }}>🕵️‍♂️ Основная история</h2>
          <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
            Классическое детективное расследование. Изучайте локации, допрашивайте подозреваемых, собирайте улики и раскройте убийство.
          </p>
        </div>

        <div style={{ padding: 'var(--spacing-lg)', background: 'var(--color-bg-panel)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
          <h2 style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-main)', marginTop: 0 }}>📅 Ежедневные дела</h2>
          <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
            Короткие головоломки: шифры, секреты и анализ вещдоков. Новое дело каждый день!
          </p>
        </div>

        <div style={{ padding: 'var(--spacing-lg)', background: 'var(--color-bg-panel)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
          <h2 style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-main)', marginTop: 0 }}>✍️ Создать детектив</h2>
          <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
            Конструктор собственных дел. Задайте персонажей, улики и убийцу — поделитесь с друзьями.
          </p>
        </div>
      </div>
    </div>
  );
}
