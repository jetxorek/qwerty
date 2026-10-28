import type { AchievementId, DailyProgress } from '../schemas/achievement';
import type { DailyPuzzle } from '../schemas/dailyPuzzle';

export const SCORE_PER_PUZZLE = 10;

export function applySolvedPuzzle(
  progress: DailyProgress,
  puzzleType: DailyPuzzle['type'],
): DailyProgress {
  return {
    ...progress,
    score: progress.score + SCORE_PER_PUZZLE,
    solvedCipher: progress.solvedCipher + (puzzleType === 'cipher' ? 1 : 0),
    solvedItem: progress.solvedItem + (puzzleType === 'item' ? 1 : 0),
    solvedSecret: progress.solvedSecret + (puzzleType === 'secret' ? 1 : 0),
  };
}

export function evaluateAchievements(progress: DailyProgress): AchievementId[] {
  const total = progress.solvedCipher + progress.solvedItem + progress.solvedSecret;
  const unlocked = new Set<AchievementId>(progress.unlockedAchievements);
  if (total >= 1) unlocked.add('first_blood');
  if (total >= 5) unlocked.add('five_puzzles');
  if (total >= 10) unlocked.add('ten_puzzles');
  if (progress.solvedCipher >= 3) unlocked.add('cipher_master');
  if (progress.solvedItem >= 3) unlocked.add('item_master');
  if (progress.solvedSecret >= 3) unlocked.add('secret_master');
  if (progress.score >= 100) unlocked.add('hundred_points');
  return Array.from(unlocked);
}
