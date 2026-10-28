import { describe, it, expect } from 'vitest';
import { applySolvedPuzzle, evaluateAchievements, SCORE_PER_PUZZLE } from './achievementEngine';
import type { DailyProgress } from '../schemas/achievement';

const empty: DailyProgress = {
  score: 0,
  solvedCipher: 0,
  solvedItem: 0,
  solvedSecret: 0,
  unlockedAchievements: [],
};

describe('applySolvedPuzzle', () => {
  it('adds score and increments cipher counter for cipher type', () => {
    const r = applySolvedPuzzle(empty, 'cipher');
    expect(r.score).toBe(SCORE_PER_PUZZLE);
    expect(r.solvedCipher).toBe(1);
    expect(r.solvedItem).toBe(0);
    expect(r.solvedSecret).toBe(0);
  });

  it('increments item counter for item type', () => {
    const r = applySolvedPuzzle(empty, 'item');
    expect(r.solvedItem).toBe(1);
    expect(r.solvedCipher).toBe(0);
    expect(r.solvedSecret).toBe(0);
  });

  it('increments secret counter for secret type', () => {
    const r = applySolvedPuzzle(empty, 'secret');
    expect(r.solvedSecret).toBe(1);
    expect(r.solvedCipher).toBe(0);
    expect(r.solvedItem).toBe(0);
  });

  it('does not mutate the input progress', () => {
    applySolvedPuzzle(empty, 'cipher');
    expect(empty.score).toBe(0);
    expect(empty.solvedCipher).toBe(0);
  });

  it('accumulates score across multiple solves', () => {
    let p = applySolvedPuzzle(empty, 'cipher');
    p = applySolvedPuzzle(p, 'item');
    p = applySolvedPuzzle(p, 'secret');
    expect(p.score).toBe(SCORE_PER_PUZZLE * 3);
  });
});

describe('evaluateAchievements', () => {
  it('unlocks first_blood after 1 solved', () => {
    const p = applySolvedPuzzle(empty, 'cipher');
    expect(evaluateAchievements(p)).toContain('first_blood');
  });

  it('unlocks five_puzzles after 5 solved total', () => {
    const p: DailyProgress = { ...empty, solvedCipher: 2, solvedItem: 2, solvedSecret: 1 };
    expect(evaluateAchievements(p)).toContain('five_puzzles');
  });

  it('unlocks ten_puzzles after 10 solved total', () => {
    const p: DailyProgress = { ...empty, solvedCipher: 4, solvedItem: 3, solvedSecret: 3 };
    expect(evaluateAchievements(p)).toContain('ten_puzzles');
  });

  it('unlocks cipher_master after 3 ciphers', () => {
    const p: DailyProgress = { ...empty, solvedCipher: 3 };
    expect(evaluateAchievements(p)).toContain('cipher_master');
  });

  it('unlocks item_master after 3 items', () => {
    const p: DailyProgress = { ...empty, solvedItem: 3 };
    expect(evaluateAchievements(p)).toContain('item_master');
  });

  it('unlocks secret_master after 3 secrets', () => {
    const p: DailyProgress = { ...empty, solvedSecret: 3 };
    expect(evaluateAchievements(p)).toContain('secret_master');
  });

  it('unlocks hundred_points at score >= 100', () => {
    const p: DailyProgress = { ...empty, score: 100 };
    expect(evaluateAchievements(p)).toContain('hundred_points');
  });

  it('does not duplicate already unlocked achievements', () => {
    const p: DailyProgress = {
      ...empty,
      solvedCipher: 3,
      unlockedAchievements: ['cipher_master'],
    };
    const result = evaluateAchievements(p);
    expect(result.filter((x) => x === 'cipher_master')).toHaveLength(1);
  });

  it('does not unlock weekly_streak automatically', () => {
    const p: DailyProgress = { ...empty, score: 999, solvedCipher: 99 };
    expect(evaluateAchievements(p)).not.toContain('weekly_streak');
  });
});
