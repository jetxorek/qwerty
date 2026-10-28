import { useGameStore } from '../store';

interface TutorialContent {
  title: string;
  steps: string[];
  targetScreen: 'scene' | 'daily_menu' | 'case_builder';
}

const TUTORIAL_CONTENT: Record<string, TutorialContent> = {
  tutorial_main: {
    title: 'Основная история',
    steps: [
      'Вы — детектив Эрнест Пирогов. На борту парохода «Карнак» совершено убийство.',
      'Изучайте сцены, допрашивайте подозреваемых, собирайте улики.',
      'Используйте нижнюю панель для переключения между персонажами.',
      'Когда будете готовы — составьте обвинение.',
    ],
    targetScreen: 'scene',
  },
  tutorial_daily: {
    title: 'Ежедневные дела',
    steps: [
      'Каждый день — новое мини-расследование от Скотленд-Ярда.',
      'Разгадывайте шифры, секреты и анализируйте вещдоки.',
      'Ответы проверяются мгновенно — думайте внимательно!',
    ],
    targetScreen: 'daily_menu',
  },
  tutorial_builder: {
    title: 'Создать детектив',
    steps: [
      'Придумайте свою детективную историю!',
      'Задайте персонажей, мотивы и алиби.',
      'Определите убийцу и ключевые улики.',
      'Поделитесь делом с друзьями.',
    ],
    targetScreen: 'case_builder',
  },
};

export function TutorialScreen() {
  const tutorialContext = useGameStore((s) => s.tutorialContext);
  const markTutorialSeen = useGameStore((s) => s.markTutorialSeen);
  const setScreen = useGameStore((s) => s.setScreen);
  const setTutorialContext = useGameStore((s) => s.setTutorialContext);

  const content = tutorialContext ? TUTORIAL_CONTENT[tutorialContext] : null;

  const handleSkip = () => {
    if (tutorialContext) {
      markTutorialSeen(tutorialContext);
    }
    setTutorialContext(null);
    setScreen('main_menu');
  };

  const handleStart = () => {
    if (tutorialContext && content) {
      markTutorialSeen(tutorialContext);
      setTutorialContext(null);
      setScreen(content.targetScreen);
    } else {
      handleSkip();
    }
  };

  if (!content) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: 'var(--spacing-lg)',
        }}
      >
        <p style={{ color: 'var(--color-text-muted)' }}>Нет данных для обучения.</p>
        <button
          onClick={handleSkip}
          style={{
            marginTop: 'var(--spacing-md)',
            padding: 'var(--spacing-md) var(--spacing-xl)',
            background: 'var(--color-accent)',
            color: 'var(--color-bg)',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            fontSize: 'var(--font-size-md)',
            fontWeight: 'bold',
          }}
        >
          Вернуться в меню
        </button>
      </div>
    );
  }

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
      {/* Кнопка "Пропустить" */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: 'var(--spacing-md)',
        }}
      >
        <button
          onClick={handleSkip}
          style={{
            background: 'transparent',
            border: '1px solid var(--color-border)',
            color: 'var(--color-text-muted)',
            padding: 'var(--spacing-sm) var(--spacing-md)',
            borderRadius: 'var(--radius-md)',
            fontSize: 'var(--font-size-sm)',
          }}
        >
          Пропустить ✕
        </button>
      </div>

      {/* Контент */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          maxWidth: '500px',
          margin: '0 auto',
          width: '100%',
        }}
      >
        <h1
          style={{
            textAlign: 'center',
            color: 'var(--color-accent)',
            fontFamily: 'var(--font-main)',
            fontSize: 'var(--font-size-2xl)',
            marginBottom: 'var(--spacing-xl)',
          }}
        >
          {content.title}
        </h1>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--spacing-md)',
          }}
        >
          {content.steps.map((step, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 'var(--spacing-md)',
                padding: 'var(--spacing-md)',
                background: 'var(--color-bg-panel)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
              }}
            >
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: 'var(--color-accent)',
                  color: 'var(--color-bg)',
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: 'bold',
                }}
              >
                {index + 1}
              </span>
              <p
                style={{
                  margin: 0,
                  color: 'var(--color-text)',
                  fontSize: 'var(--font-size-md)',
                  lineHeight: 1.5,
                }}
              >
                {step}
              </p>
            </div>
          ))}
        </div>

        {/* Кнопка "Начать" */}
        <button
          onClick={handleStart}
          style={{
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
          Начать расследование →
        </button>
      </div>
    </div>
  );
}
