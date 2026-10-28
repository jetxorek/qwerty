import { useState, useEffect } from 'react';
import { useGameStore } from '../store';
import { DAILY_PUZZLES } from '../data/dailyPuzzles';
import type { DailyPuzzle } from '../schemas/dailyPuzzle';
import { SecretPuzzle } from '../components/daily/SecretPuzzle';
import { CipherPuzzle } from '../components/daily/CipherPuzzle';
import { ItemPuzzle } from '../components/daily/ItemPuzzle';
import { HowToPlayDailyOverlay } from '../components/overlays/HowToPlayDailyOverlay';

const STORAGE_KEY = 'mfe_daily_solved_date';

function getTodayDate(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

function isSolvedToday(): boolean {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === getTodayDate();
}

function markSolvedToday(): void {
  localStorage.setItem(STORAGE_KEY, getTodayDate());
}

type PuzzleType = 'cipher' | 'item' | 'secret';

export function DailyPuzzleScreen() {
  const setScreen = useGameStore((s) => s.setScreen);
  const [selectedType, setSelectedType] = useState<PuzzleType | null>(null);
  const [isSolved, setIsSolved] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [alreadySolved, setAlreadySolved] = useState(false);

  useEffect(() => {
    if (isSolvedToday()) {
      setAlreadySolved(true);
    }
  }, []);

  const handleSolve = () => {
    markSolvedToday();
    setIsSolved(true);
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText('Я раскрыл дело в Смерти на Ниле!');
      alert('Текст скопирован в буфер обмена!');
    } catch {
      alert('Не удалось скопировать текст');
    }
  };

  const getPuzzleByType = (type: PuzzleType): DailyPuzzle | undefined => {
    return DAILY_PUZZLES.find((p) => p.type === type);
  };

  // Уже решено сегодня
  if (alreadySolved) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: 'var(--spacing-lg)',
          background: 'var(--color-bg)',
        }}
      >
        <div
          style={{
            maxWidth: '500px',
            width: '100%',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: '4rem',
              marginBottom: 'var(--spacing-lg)',
            }}
          >
            ✓
          </div>
          <h1
            style={{
              color: 'var(--color-accent)',
              fontFamily: 'var(--font-main)',
              fontSize: 'var(--font-size-2xl)',
              marginBottom: 'var(--spacing-md)',
            }}
          >
            На сегодня все дела закрыты
          </h1>
          <p
            style={{
              color: 'var(--color-text-muted)',
              fontSize: 'var(--font-size-md)',
              marginBottom: 'var(--spacing-xl)',
              lineHeight: 1.6,
            }}
          >
            Возвращайтесь завтра за новыми заданиями от Скотленд-Ярда!
          </p>
          <button
            onClick={() => setScreen('main_menu')}
            style={{
              padding: 'var(--spacing-lg)',
              background: 'var(--color-accent)',
              color: 'var(--color-bg)',
              border: 'none',
              borderRadius: 'var(--radius-lg)',
              fontSize: 'var(--font-size-lg)',
              fontWeight: 'bold',
              fontFamily: 'var(--font-main)',
              minHeight: '56px',
              width: '100%',
            }}
          >
            В меню
          </button>
        </div>
      </div>
    );
  }

  // Решено только что
  if (isSolved) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: 'var(--spacing-lg)',
          background: 'var(--color-bg)',
        }}
      >
        <div
          style={{
            maxWidth: '500px',
            width: '100%',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: '4rem',
              marginBottom: 'var(--spacing-lg)',
            }}
          >
            🎉
          </div>
          <h1
            style={{
              color: 'var(--color-success)',
              fontFamily: 'var(--font-main)',
              fontSize: 'var(--font-size-2xl)',
              marginBottom: 'var(--spacing-md)',
            }}
          >
            Дело раскрыто!
          </h1>
          <p
            style={{
              color: 'var(--color-text-muted)',
              fontSize: 'var(--font-size-md)',
              marginBottom: 'var(--spacing-xl)',
              lineHeight: 1.6,
            }}
          >
            Отличная работа, детектив! Возвращайтесь завтра за новыми заданиями.
          </p>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--spacing-md)',
            }}
          >
            <button
              onClick={handleShare}
              style={{
                padding: 'var(--spacing-lg)',
                background: 'var(--color-bg-panel)',
                color: 'var(--color-accent)',
                border: '2px solid var(--color-accent)',
                borderRadius: 'var(--radius-lg)',
                fontSize: 'var(--font-size-lg)',
                fontWeight: 'bold',
                fontFamily: 'var(--font-main)',
                minHeight: '56px',
              }}
            >
              📤 Поделиться
            </button>
            <button
              onClick={() => setScreen('main_menu')}
              style={{
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
              В меню
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Выбор задания
  if (!selectedType) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          padding: 'var(--spacing-lg)',
          background: 'var(--color-bg)',
          position: 'relative',
        }}
      >
        {/* Кнопка "Как играть" */}
        <button
          onClick={() => setShowHowToPlay(true)}
          style={{
            position: 'absolute',
            top: 'var(--spacing-lg)',
            right: 'var(--spacing-lg)',
            background: 'transparent',
            border: '1px solid var(--color-border)',
            color: 'var(--color-text)',
            padding: 'var(--spacing-sm) var(--spacing-md)',
            borderRadius: 'var(--radius-md)',
            fontSize: 'var(--font-size-md)',
          }}
        >
          ❓
        </button>

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
            Выберите депешу
          </h1>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--spacing-md)',
            }}
          >
            <button
              onClick={() => setSelectedType('cipher')}
              style={{
                padding: 'var(--spacing-lg)',
                minHeight: '100px',
                background: 'var(--color-bg-panel)',
                border: '2px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                color: 'var(--color-text)',
                fontSize: 'var(--font-size-lg)',
                fontFamily: 'var(--font-main)',
                textAlign: 'left',
              }}
            >
              🔐 Шифр дня
            </button>

            <button
              onClick={() => setSelectedType('item')}
              style={{
                padding: 'var(--spacing-lg)',
                minHeight: '100px',
                background: 'var(--color-bg-panel)',
                border: '2px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                color: 'var(--color-text)',
                fontSize: 'var(--font-size-lg)',
                fontFamily: 'var(--font-main)',
                textAlign: 'left',
              }}
            >
              🔎 Вещдок дня
            </button>

            <button
              onClick={() => setSelectedType('secret')}
              style={{
                padding: 'var(--spacing-lg)',
                minHeight: '100px',
                background: 'var(--color-bg-panel)',
                border: '2px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                color: 'var(--color-text)',
                fontSize: 'var(--font-size-lg)',
                fontFamily: 'var(--font-main)',
                textAlign: 'left',
              }}
            >
              📰 Секрет дня
            </button>
          </div>

          <button
            onClick={() => setScreen('main_menu')}
            style={{
              marginTop: 'var(--spacing-xl)',
              padding: 'var(--spacing-md)',
              background: 'transparent',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text-muted)',
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--font-size-sm)',
            }}
          >
            ← Назад в меню
          </button>
        </div>

        {showHowToPlay && <HowToPlayDailyOverlay onClose={() => setShowHowToPlay(false)} />}
      </div>
    );
  }

  // Рендер выбранного задания
  const puzzle = getPuzzleByType(selectedType);

  if (!puzzle) {
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
        <p style={{ color: 'var(--color-text-muted)' }}>Задание не найдено.</p>
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
      <div
        style={{
          maxWidth: '600px',
          margin: '0 auto',
          width: '100%',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {selectedType === 'secret' && <SecretPuzzle puzzle={puzzle} onSolve={handleSolve} />}
        {selectedType === 'cipher' && <CipherPuzzle puzzle={puzzle} onSolve={handleSolve} />}
        {selectedType === 'item' && <ItemPuzzle puzzle={puzzle} onSolve={handleSolve} />}
      </div>
    </div>
  );
}
