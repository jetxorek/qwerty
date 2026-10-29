import type { Note } from '../schemas/note';
import type { AccusationResult } from '../schemas/accusation';
import { NOTE_MATRIX } from '../data/noteMatrix';

// В нашем MVP убийцы — Симон (char_02) и Жанна (char_03).
// Игрок может обвинить любого из них, оба считаются правильным ответом.
const CORRECT_CULPRITS = ['char_02', 'char_03'];

export function evaluateAccusation(culpritId: string, selectedNotes: Note[]): AccusationResult {
  let score = 0;
  const categories = new Set<string>();

  // 1. Оценка каждой улики
  selectedNotes.forEach((note) => {
    if (note.truth === 'true') score += 1;
    if (note.truth === 'false') score -= 1;
    
    // Проверяем, является ли улика "сильной" (ищем в матрице по ID)
    const matrixItem = NOTE_MATRIX.find((m) => m.id === note.id);
    if (matrixItem?.isStrong) score += 0.5;

    // Считаем охват (coverage) только по 5 ключевым категориям
    if (['motive', 'opportunity', 'alibi', 'psychology', 'contradiction'].includes(note.category)) {
      categories.add(note.category);
    }
  });

  // 2. Штраф за противоречия (две заметки на одного target и category, где одна true, другая false)
  for (let i = 0; i < selectedNotes.length; i++) {
    for (let j = i + 1; j < selectedNotes.length; j++) {
      const a = selectedNotes[i];
      const b = selectedNotes[j];
      if (a.target === b.target && a.category === b.category) {
        if ((a.truth === 'true' && b.truth === 'false') || (a.truth === 'false' && b.truth === 'true')) {
          score -= 2;
        }
      }
    }
  }

  const isCorrectCulprit = CORRECT_CULPRITS.includes(culpritId);
  const coverageCount = categories.size;
  
  // 3. Определение вердикта
  let verdict: 'full' | 'partial' | 'fail' = 'fail';
  if (isCorrectCulprit && score >= 8 && coverageCount >= 5) {
    verdict = 'full';
  } else if (isCorrectCulprit && (score > 0 || coverageCount > 0)) {
    verdict = 'partial';
  }

  return {
    culpritId,
    isCorrectCulprit,
    score,
    coverageCount,
    coveredCategories: Array.from(categories),
    verdict,
  };
}
