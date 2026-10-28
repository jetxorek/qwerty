import { DailyProgressSchema } from '../schemas/achievement';
import type { DailyProgress } from '../schemas/achievement';

const STORAGE_KEY = 'mfe_daily_progress';

const EMPTY_PROGRESS: DailyProgress = {
  score: 0,
  solvedCipher: 0,
  solvedItem: 0,
  solvedSecret: 0,
  unlockedAchievements: [],
};

export function loadDailyProgress(): DailyProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...EMPTY_PROGRESS, unlockedAchievements: [] };
    const parsed: unknown = JSON.parse(raw);
    const result = DailyProgressSchema.safeParse(parsed);
    if (!result.success) return { ...EMPTY_PROGRESS, unlockedAchievements: [] };
    return result.data;
  } catch {
    return { ...EMPTY_PROGRESS, unlockedAchievements: [] };
  }
}

export function saveDailyProgress(progress: DailyProgress): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}
