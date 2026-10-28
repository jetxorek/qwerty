interface HowToPlayBuilderOverlayProps {
  onClose: () => void;
}

export function HowToPlayBuilderOverlay({ onClose }: HowToPlayBuilderOverlayProps) {
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
          Как это работает
        </h2>

        <div
          style={{
            color: 'var(--color-text)',
            fontSize: 'var(--font-size-md)',
            lineHeight: 1.7,
          }}
        >
          <p style={{ margin: '0 0 var(--spacing-md)' }}>
            Здесь вы создаете «скелет» вашей истории.
          </p>
          <p style={{ margin: '0 0 var(--spacing-md)' }}>
            Вам не нужно писать текст вручную. Заполните карточки персонажей, пропишите их мотивы и укажите, кто убийца.
          </p>
          <p style={{ margin: '0 0 var(--spacing-md)' }}>
            Наш ИИ (в будущем) обернет этот каркас в литературный текст, диалоги и атмосферу.
          </p>
          <p style={{ margin: 0 }}>
            Пока вы можете сохранить черновик в память устройства и показать его друзьям.
          </p>
        </div>

        <button
          onClick={onClose}
          style={{
            width: '100%',
            marginTop: 'var(--spacing-xl)',
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
