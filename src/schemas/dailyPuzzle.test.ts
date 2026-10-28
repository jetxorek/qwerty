import { describe, it, expect } from 'vitest';
import { DailyPuzzleSchema } from './dailyPuzzle';
import { DAILY_PUZZLES } from '../data/dailyPuzzles';
import type { DailyPuzzle } from './dailyPuzzle';

describe('DailyPuzzleSchema', () => {
  it('parses a valid cipher puzzle', () => {
    const valid: DailyPuzzle = {
      type: 'cipher',
      id: 'test_cipher',
      title: 'Test',
      story: 'Story',
      cipherText: '.--.',
      correctAnswer: 'P',
      explanation: 'Expl',
    };
    expect(DailyPuzzleSchema.safeParse(valid).success).toBe(true);
  });

  it('allows optional hint on cipher puzzle', () => {
    const valid: DailyPuzzle = {
      type: 'cipher',
      id: 'test_cipher_hint',
      title: 'Test',
      story: 'Story',
      cipherText: '.--.',
      correctAnswer: 'P',
      hint: 'Подсказка',
      explanation: 'Expl',
    };
    expect(DailyPuzzleSchema.safeParse(valid).success).toBe(true);
  });

  it('rejects cipher puzzle without correctAnswer', () => {
    const invalid = {
      type: 'cipher',
      id: 'test_cipher_bad',
      title: 'Test',
      story: 'Story',
      cipherText: '.--.',
      explanation: 'Expl',
    };
    expect(DailyPuzzleSchema.safeParse(invalid).success).toBe(false);
  });

  it('parses a valid item puzzle', () => {
    const valid: DailyPuzzle = {
      type: 'item',
      id: 'test_item',
      title: 'Test',
      story: 'Story',
      location: 'Петербург',
      timePeriod: '1880-е',
      task: 'Найдите лишнее',
      items: ['a', 'b', 'c'],
      oddItem: 'c',
      explanation: 'Expl',
    };
    expect(DailyPuzzleSchema.safeParse(valid).success).toBe(true);
  });

  it('rejects item puzzle with fewer than 3 items', () => {
    const invalid = {
      type: 'item',
      id: 'test_item_bad',
      title: 'Test',
      story: 'Story',
      location: 'X',
      timePeriod: 'Y',
      task: 'Z',
      items: ['a', 'b'],
      oddItem: 'b',
      explanation: 'Expl',
    };
    expect(DailyPuzzleSchema.safeParse(invalid).success).toBe(false);
  });

  it('rejects item puzzle without location', () => {
    const invalid = {
      type: 'item',
      id: 'test_item_noloc',
      title: 'Test',
      story: 'Story',
      timePeriod: 'Y',
      task: 'Z',
      items: ['a', 'b', 'c'],
      oddItem: 'c',
      explanation: 'Expl',
    };
    expect(DailyPuzzleSchema.safeParse(invalid).success).toBe(false);
  });

  it('parses a valid secret puzzle', () => {
    const valid: DailyPuzzle = {
      type: 'secret',
      id: 'test_secret',
      title: 'Test',
      story: 'Story',
      testimonials: [
        { speaker: 'A', text: 'Text A' },
        { speaker: 'B', text: 'Text B' },
      ],
      options: ['o1', 'o2'],
      correctAnswer: 'o1',
      explanation: 'Expl',
    };
    expect(DailyPuzzleSchema.safeParse(valid).success).toBe(true);
  });

  it('rejects secret puzzle with fewer than 2 testimonials', () => {
    const invalid = {
      type: 'secret',
      id: 'test_secret_bad',
      title: 'Test',
      story: 'Story',
      testimonials: [{ speaker: 'A', text: 'Text A' }],
      options: ['o1', 'o2'],
      correctAnswer: 'o1',
      explanation: 'Expl',
    };
    expect(DailyPuzzleSchema.safeParse(invalid).success).toBe(false);
  });

  it('rejects unknown puzzle type', () => {
    const invalid = {
      type: 'unknown',
      id: 'x',
      title: 'Test',
      story: 'Story',
      explanation: 'Expl',
    };
    expect(DailyPuzzleSchema.safeParse(invalid).success).toBe(false);
  });

  it('validates every puzzle in DAILY_PUZZLES against the schema', () => {
    for (const puzzle of DAILY_PUZZLES) {
      const result = DailyPuzzleSchema.safeParse(puzzle);
      expect(result.success).toBe(true);
    }
  });

  it('has exactly one puzzle of each type', () => {
    const types = DAILY_PUZZLES.map((p) => p.type).sort();
    expect(types).toEqual(['cipher', 'item', 'secret']);
  });
});
