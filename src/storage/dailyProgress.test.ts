import { describe, it, expect, beforeEach } from 'vitest';
import { loadDailyProgress, saveDailyProgress } from './dailyProgress';
import type { DailyProgress } from '../schemas/achievement';

describe('dailyProgress storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns empty progress when storage is empty', () => {
    const p = loadDailyProgress();
    expect(p.score).toBe(0);
    expect(p.solvedCipher).toBe(0);
    expect(p.solvedItem).toBe(0);
    expect(p.solvedSecret).toBe(0);
    expect(p.unlockedAchievements).toEqual([]);
  });

  it('round-trips a saved progress', () => {
    const p: DailyProgress = {
      score: 20,
      solvedCipher: 1,
      solvedItem: 1,
      solvedSecret: 0,
      unlockedAchievements: ['first_blood'],
    };
    saveDailyProgress(p);
    const loaded = loadDailyProgress();
    expect(loaded).toEqual(p);
  });

  it('returns empty progress on invalid JSON', () => {
    localStorage.setItem('mfe_daily_progress', 'not json');
    const p = loadDailyProgress();
    expect(p.score).toBe(0);
    expect(p.unlockedAchievements).toEqual([]);
  });

  it('returns empty progress on schema-invalid data', () => {
    localStorage.setItem('mfe_daily_progress', JSON.stringify({ score: -5 }));
    const p = loadDailyProgress();
    expect(p.score).toBe(0);
  });

  it('returns empty progress on unknown achievement id', () => {
    localStorage.setItem(
      'mfe_daily_progress',
      JSON.stringify({
        score: 10,
        solvedCipher: 1,
        solvedItem: 0,
        solvedSecret: 0,
        unlockedAchievements: ['unknown_achievement'],
      }),
    );
    const p = loadDailyProgress();
    expect(p.score).toBe(0);
    expect(p.unlockedAchievements).toEqual([]);
  });
});
