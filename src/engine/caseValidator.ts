import type { CaseDraft } from '../schemas/caseDraft';

export function validateCaseDraft(draft: CaseDraft): string[] {
  const errors: string[] = [];

  // Проверка названия
  if (!draft.title || draft.title.trim().length < 5) {
    errors.push('Название должно содержать минимум 5 символов');
  }

  // Проверка количества персонажей
  if (!draft.characters || draft.characters.length < 3) {
    errors.push('Должно быть минимум 3 персонажа');
  } else {
    // Проверка каждого персонажа
    draft.characters.forEach((char, index) => {
      if (!char.name || char.name.trim().length === 0) {
        errors.push(`Персонаж #${index + 1}: не заполнено имя`);
      }
      if (!char.motive || char.motive.trim().length === 0) {
        errors.push(`Персонаж "${char.name || `#${index + 1}`}": не заполнен мотив`);
      }
      if (!char.alibi || char.alibi.trim().length === 0) {
        errors.push(`Персонаж "${char.name || `#${index + 1}`}": не заполнено алиби`);
      }
    });
  }

  // Проверка убийцы
  if (!draft.murdererId || draft.murdererId.trim().length === 0) {
    errors.push('Не выбран убийца');
  } else if (draft.characters && draft.characters.length > 0) {
    const murdererExists = draft.characters.some((char) => char.id === draft.murdererId);
    if (!murdererExists) {
      errors.push('Выбранный убийца не существует в списке персонажей');
    }
  }

  // Проверка улик
  if (!draft.keyEvidence || draft.keyEvidence.length === 0) {
    errors.push('Должна быть минимум одна улика');
  } else {
    draft.keyEvidence.forEach((evidence, index) => {
      if (!evidence.name || evidence.name.trim().length === 0) {
        errors.push(`Улика #${index + 1}: не заполнено название`);
      }
    });
  }

  return errors;
}
