import { useGameStore } from '../store';

export function MainMenuScreen() {
  const setScreen = useGameStore((s) => s.setScreen);
  const hasSeenTutorial = useGameStore((s) => s.hasSeenTutorial);
  const setTutorialContext = useGameStore((s) => s.setTutorialContext);

  const handleMainStory = () => {
    if (hasSeenTutorial('tutorial_main')) {
      setScreen('scene');
    } else {
      setTutorialContext('tutorial_main');
      setScreen('tutorial');
    }
  };

  const handleDailyCases = () => {
    if (hasSeenTutorial('tutorial_daily')) {
      setScreen('daily_menu');
    } else {
      setTutorialContext('tutorial_daily');
      setScreen('tutorial');
    }
  };

  const handleCaseBuilder = () => {
    if (hasSeenTutorial('tutorial_builder')) {
      setScreen('case_builder');
    } else {
      setTutorialContext('tutorial_builder');
      setScreen('tutorial');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: 'var(--spacing-lg)',
        minHeight: '100vh',
        position: 'relative',
        justifyContent: 'center',
      }}
    >
      {/* Верхняя панель */}
      <div
        style={{
          position: 'absolute',
          top: 'var(--spacing-lg)',
          right: 'var(--spacing-lg)',
          display: 'flex',
          gap: 'var(--spacing-sm)',
        }}
      >
        <button
          onClick={() => setScreen('settings')}
          style={{
            background: 'transparent',
            border: 'none',
            fontSize: '1.5rem',
            padding: 'var(--spacing-sm)',
          }}
          aria-label="Настройки"
        >
          ⚙️
        </button>
        <button
          onClick={() => setScreen('how_to_play')}
          style={{
            background: 'transparent',
            border: 'none',
            fontSize: '1.5rem',
            padding: 'var(--spacing-sm)',
          }}
          aria-label="Как играть"
        >
          ❓
        </button>
      </div>

      <h1
        style={{
          textAlign: 'center',
          marginBottom: 'var(--spacing-lg)',
          color: 'var(--color-accent)',
          fontFamily: 'var(--font-main)',
          fontSize: 'var(--font-size-3xl)',
          letterSpacing: '0.05em',
        }}
      >
        Смерть на Ниле
      </h1>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacing-md)',
          maxWidth: '500px',
          margin: '0 auto',
          width: '100%',
        }}
      >
        {/* 1. Основная история */}
        <button
          onClick={handleMainStory}
          style={{
            padding: 'var(--spacing-lg)',
            minHeight: '120px',
            textAlign: 'left',
            border: '2px solid var(--color-accent)',
            background: 'var(--color-bg-panel)',
            borderRadius: 'var(--radius-lg)',
            color: 'var(--color-text)',
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: 'var(--font-size-lg)',
              fontFamily: 'var(--font-main)',
            }}
          >
            🕵️‍♂️ Основная история
          </h2>
          <p
            style={{
              margin: '8px 0 0',
              color: 'var(--color-text-muted)',
              fontSize: 'var(--font-size-sm)',
            }}
          >
            Убийство на Ниле. Начните расследование.
          </p>
        </button>

        {/* 2. Ежедневные дела */}
        <button
          onClick={handleDailyCases}
          style={{
            padding: 'var(--spacing-lg)',
            minHeight: '120px',
            textAlign: 'left',
            border: '1px solid var(--color-border)',
            background: 'var(--color-bg-panel)',
            borderRadius: 'var(--radius-lg)',
            color: 'var(--color-text)',
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: 'var(--font-size-lg)',
              fontFamily: 'var(--font-main)',
            }}
          >
            📅 Ежедневные дела
          </h2>
          <p
            style={{
              margin: '8px 0 0',
              color: 'var(--color-text-muted)',
              fontSize: 'var(--font-size-sm)',
            }}
          >
            Помогите коллегам из Скотленд-Ярда.
          </p>
        </button>

        {/* 3. Создать детектив */}
        <button
          onClick={handleCaseBuilder}
          style={{
            padding: 'var(--spacing-lg)',
            minHeight: '120px',
            textAlign: 'left',
            border: '1px solid var(--color-border)',
            background: 'var(--color-bg-panel)',
            borderRadius: 'var(--radius-lg)',
            color: 'var(--color-text)',
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: 'var(--font-size-lg)',
              fontFamily: 'var(--font-main)',
            }}
          >
            ✍️ Создать детектив
          </h2>
          <p
            style={{
              margin: '8px 0 0',
              color: 'var(--color-text-muted)',
              fontSize: 'var(--font-size-sm)',
            }}
          >
            Придумайте свою историю.
          </p>
        </button>
      </div>
    </div>
  );
}
