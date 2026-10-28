import { describe, it, expect } from 'vitest';
import { validateCaseDraft } from './caseValidator';
import type { CaseDraft } from '../schemas/caseDraft';

describe('validateCaseDraft', () => {
  it('should return many errors for empty draft', () => {
    const emptyDraft: CaseDraft = {
      title: '',
      description: '',
      characters: [],
      murdererId: '',
      keyEvidence: [],
    };

    const errors = validateCaseDraft(emptyDraft);

    expect(errors.length).toBeGreaterThan(3);
    expect(errors).toContain('Название должно содержать минимум 5 символов');
    expect(errors).toContain('Должно быть минимум 3 персонажа');
    expect(errors).toContain('Не выбран убийца');
    expect(errors).toContain('Должна быть минимум одна улика');
  });

  it('should return error when murdererId is empty', () => {
    const draft: CaseDraft = {
      title: 'Убийство в поезде',
      description: 'Детективная история',
      characters: [
        { id: '1', name: 'Детектив', role: 'detective', description: 'Главный герой', motive: '', alibi: '' },
        { id: '2', name: 'Подозреваемый', role: 'suspect', description: 'Жертва', motive: 'Месть', alibi: 'Был дома' },
        { id: '3', name: 'Свидетель', role: 'suspect', description: 'Случайный прохожий', motive: 'Зависть', alibi: 'На работе' },
      ],
      murdererId: '',
      keyEvidence: [{ id: '1', name: 'Нож', description: 'Орудие убийства' }],
    };

    const errors = validateCaseDraft(draft);

    expect(errors).toContain('Не выбран убийца');
    expect(errors.length).toBe(1);
  });

  it('should return empty array for perfect draft', () => {
    const perfectDraft: CaseDraft = {
      title: 'Убийство в поезде',
      description: 'Детективная история о загадочном убийстве',
      characters: [
        { id: '1', name: 'Детектив', role: 'detective', description: 'Главный герой', motive: 'Профессиональный интерес', alibi: 'Приехал на место преступления' },
        { id: '2', name: 'Подозреваемый', role: 'suspect', description: 'Бизнесмен', motive: 'Месть за предательство', alibi: 'Был в отеле в это время' },
        { id: '3', name: 'Свидетель', role: 'suspect', description: 'Секретарь', motive: 'Зависть к жертве', alibi: 'Работала в офисе до позднего вечера' },
      ],
      murdererId: '2',
      keyEvidence: [{ id: '1', name: 'Нож', description: 'Орудие убийства с отпечатками пальцев' }],
    };

    const errors = validateCaseDraft(perfectDraft);

    expect(errors).toEqual([]);
  });
});
