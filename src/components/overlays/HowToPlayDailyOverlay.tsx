interface HowToPlayDailyOverlayProps {
  onClose: () => void;
}

export function HowToPlayDailyOverlay({ onClose }: HowToPlayDailyOverlayProps) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50,
        padding: 'var(--spacing-md)',
        backdropFilter: 'blur(4px)',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'var(--color-bg-panel)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--spacing-xl)',
          maxWidth: '500px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          style={{
            margin: '0 0 var(--spacing-lg)',
            color: 'var(--color-accent)',
            fontFamily: 'var(--font-main)',
            fontSize: 'var(--font-size-xl)',
            textAlign: 'center',
          }}
        >
          Дела от коллег
        </h2>

        <div
          style={{
            color: 'var(--color-text)',
            fontSize: 'var(--font-size-md)',
            lineHeight: 1.7,
          }}
        >
          <p style={{ margin: '0 0 var(--spacing-md)' }}>
            Эрнест Пирогов продолжает консультировать Скотленд-Ярд даже в отпуске.
          </p>

          <ul
            style={{
              margin: '0 0 var(--spacing-lg)',
              paddingLeft: 'var(--spacing-lg)',
            }}
          >
            <li style={{ marginBottom: 'var(--spacing-sm)' }}>
              Вы можете решать задания в любом порядке.
            </li>
            <li style={{ marginBottom: 'var(--spacing-sm)' }}>
              <strong style={{ color: 'var(--color-accent)' }}>
                Разрешено пользоваться интернетом и поисковиками!
              </strong>{' '}
              Пирогов всегда проверяет факты по энциклопедиям.
            </li>
            <li style={{ marginBottom: 'var(--spacing-sm)' }}>
              Если нужно что-то посчитать или записать — используйте стандартные заметки на телефоне.
            </li>
            <li>
              Ваша задача — найти логику, расшифровать код или вычислить ложь в показаниях.
            </li>
          </ul>
        </div>

        <button
          onClick={onClose}
          style={{
            width: '100%',
            padding: 'var(--spacing-lg)',
            background: 'var(--color-accent)',
            color: 'var(--color-bg)',
            border: 'none',
            borderRadius: 'var(--radius-lg)',
            fontSize: 'var(--font-size-lg)',
            fontWeight: 'bold',
            fontFamily: 'var(--font-main)',
            minHeight: '56px',
          }}
        >
          Понятно
        </button>
      </div>
    </div>
  );
}
