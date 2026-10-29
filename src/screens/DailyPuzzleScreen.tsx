import { useEffect, useState } from 'react';
import { useGameStore } from '../store';
import { DAILY_PUZZLES } from '../data/dailyPuzzles';
import { AppHeader } from '../components/AppHeader';
import { CipherPuzzle } from '../components/daily/CipherPuzzle';
import { ItemPuzzle } from '../components/daily/ItemPuzzle';
import { SecretPuzzle } from '../components/daily/SecretPuzzle';
import { HowToPlayDailyOverlay } from '../components/overlays/HowToPlayDailyOverlay';
import { AchievementsOverlay } from '../components/overlays/AchievementsOverlay';
import { applySolvedPuzzle, evaluateAchievements } from '../engine/achievementEngine';
import { loadDailyProgress, saveDailyProgress } from '../storage/dailyProgress';
import type { DailyProgress } from '../schemas/achievement';

type PuzzleType = 'cipher' | 'item' | 'secret';

export function DailyPuzzleScreen() {
  const setScreen = useGameStore((s) => s.setScreen);
  const [showRules, setShowRules] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [progress, setProgress] = useState<DailyProgress>(() => loadDailyProgress());
  const [selectedType, setSelectedType] = useState<PuzzleType | null>(null);

  const today = new Date().toDateString();
  const solvedDate = localStorage.getItem('mfe_daily_solved_date');
  const isSolvedToday = solvedDate === today;

  useEffect(() => {
    setProgress(loadDailyProgress());
  }, []);

  const handleSolve = () => {
    if (!selectedType) return;
    const current = loadDailyProgress();
    const afterSolve = applySolvedPuzzle(current, selectedType);
    const unlocked = evaluateAchievements(afterSolve);
    const next: DailyProgress = { ...afterSolve, unlockedAchievements: unlocked };
    saveDailyProgress(next);
    setProgress(next);
    localStorage.setItem('mfe_daily_solved_date', today);
  };

  const handleClose = () => setSelectedType(null);

  // Новая логика кнопки Назад
  const handleBack = () => {
    if (selectedType !== null) {
      setSelectedType(null);
    } else {
      setScreen('main_menu');
    }
  };

  const renderContent = () => {
    if (isSolvedToday && !selectedType) {
      return (
        <div style={{ padding: 'var(--spacing-lg)', textAlign: 'center' }}>
          <h2>На сегодня все дела закрыты.</h2>
          <p style={{ color: 'var(--color-text-muted)' }}>Возвращайтесь завтра!</p>
          <button
            onClick={() => setScreen('main_menu')}
            style={{
              marginTop: 'var(--spacing-lg)',
              padding: 'var(--spacing-md)',
              background: 'var(--color-accent)',
              color: 'var(--color-bg)',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
            }}
          >
            В меню
          </button>
        </div>
      );
    }

    if (selectedType) {
      const puzzle = DAILY_PUZZLES.find((p) => p.type === selectedType);
      if (!puzzle) return null;

      if (puzzle.type === 'cipher') {
        return <CipherPuzzle puzzle={puzzle} onSolve={handleSolve} onClose={handleClose} />;
      }
      if (puzzle.type === 'item') {
        return <ItemPuzzle puzzle={puzzle} onSolve={handleSolve} onClose={handleClose} />;
      }
      if (puzzle.type === 'secret') {
        return <SecretPuzzle puzzle={puzzle} onSolve={handleSolve} onClose={handleClose} />;
      }
    }

    return (
      <div style={{ padding: 'var(--spacing-lg)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: 'var(--spacing-sm)' }}>Выберите депешу</h2>
        <p
          style={{
            textAlign: 'center',
            color: 'var(--color-text-muted)',
            marginBottom: 'var(--spacing-lg)',
          }}
        >
          Каждый день новые дела
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
          <button
            onClick={() => setSelectedType('cipher')}
            style={{
              padding: 'var(--spacing-lg)',
              border: '1px solid var(--color-accent)',
              background: 'var(--color-bg-panel)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--color-text)',
              cursor: 'pointer',
            }}
          >
            <h3 style={{ margin: 0 }}>📜 Шифр дня</h3>
          </button>
          <button
            onClick={() => setSelectedType('item')}
            style={{
              padding: 'var(--spacing-lg)',
              border: '1px solid var(--color-border)',
              background: 'var(--color-bg-panel)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--color-text)',
              cursor: 'pointer',
            }}
          >
            <h3 style={{ margin: 0 }}>🕵️ Вещдок дня</h3>
          </button>
          <button
            onClick={() => setSelectedType('secret')}
            style={{
              padding: 'var(--spacing-lg)',
              border: '1px solid var(--color-border)',
              background: 'var(--color-bg-panel)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--color-text)',
              cursor: 'pointer',
            }}
          >
            <h3 style={{ margin: 0 }}>📰 Секрет дня</h3>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppHeader
        title="Ежедневные дела"
        rightContent={
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
            <button
              onClick={handleBack}
              aria-label="Назад"
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--color-accent)',
                fontSize: '0.875rem',
                cursor: 'pointer',
                padding: 'var(--spacing-xs) var(--spacing-sm)',
              }}
            >
              ← Назад
            </button>
            <span style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
              {progress.score}
            </span>
            <button
              onClick={() => setShowAchievements(true)}
              aria-label="Ачивки"
              style={{
                background: 'transparent',
                border: '1px solid var(--color-border)',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.1rem',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              🏅
            </button>
            <button
              onClick={() => setShowRules(true)}
              aria-label="Как играть"
              style={{
                background: 'transparent',
                border: 'none',
                fontSize: '1.2rem',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              ❓
            </button>
          </div>
        }
      />
      <div style={{ flex: 1 }}>{renderContent()}</div>
      {showRules && <HowToPlayDailyOverlay onClose={() => setShowRules(false)} />}
      {showAchievements && <AchievementsOverlay onClose={() => setShowAchievements(false)} />}
    </div>
  );
}
