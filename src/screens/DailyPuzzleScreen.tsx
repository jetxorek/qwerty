import { useState } from 'react';
import { useGameStore } from '../store';
import { DAILY_PUZZLES } from '../data/dailyPuzzles';
import { AppHeader } from '../components/AppHeader';
import { CipherPuzzle } from '../components/daily/CipherPuzzle';
import { ItemPuzzle } from '../components/daily/ItemPuzzle';
import { SecretPuzzle } from '../components/daily/SecretPuzzle';
import { HowToPlayDailyOverlay } from '../components/overlays/HowToPlayDailyOverlay';

export function DailyPuzzleScreen() {
  const setScreen = useGameStore((s) => s.setScreen);
  const [showRules, setShowRules] = useState(false);
  const [selectedType, setSelectedType] = useState<'cipher' | 'item' | 'secret' | null>(null);

  const today = new Date().toDateString();
  const solvedDate = localStorage.getItem('mfe_daily_solved_date');
  const isSolvedToday = solvedDate === today;

  const handleSolve = () => {
    localStorage.setItem('mfe_daily_solved_date', today);
  };

  const handleClose = () => {
    setSelectedType(null);
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
        showBack
        rightContent={
          <button
            onClick={() => setShowRules(true)}
            style={{ background: 'transparent', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}
          >
            ❓
          </button>
        }
      />
      <div style={{ flex: 1 }}>{renderContent()}</div>
      {showRules && <HowToPlayDailyOverlay onClose={() => setShowRules(false)} />}
    </div>
  );
}
