import { z } from 'zod';

export const NoteCategorySchema = z.enum([
  'motive',
  'opportunity',
  'alibi',
  'psychology',
  'contradiction',
  'evidence',
  'witness',
  'timeline',
  'other',
]);

export const NoteTruthSchema = z.enum(['true', 'false', 'plausible']);

// Схема для заметки в блокноте игрока (существующая)
export const NoteSchema = z.object({
  id: z.string(),
  text: z.string(),
  statement: z.string(),
  category: NoteCategorySchema,
  target: z.string().nullable(),
  isPersonal: z.boolean(),
  important: z.boolean(),
  discarded: z.boolean(),
  truth: NoteTruthSchema,
});

// Новая схема для матрицы улик (база данных)
export const NoteMatrixItemSchema = z.object({
  id: z.string(),
  targetId: z.string(),
  category: NoteCategorySchema,
  text: z.string(), // Точная подстрока, которую выделяет игрок
  statement: z.string(), // Как запишется в блокнот
  truth: NoteTruthSchema,
  isStrong: z.boolean().default(false),
});

export type Note = z.infer<typeof NoteSchema>;
export type NoteCategory = z.infer<typeof NoteCategorySchema>;
export type NoteTruth = z.infer<typeof NoteTruthSchema>;
export type NoteMatrixItem = z.infer<typeof NoteMatrixItemSchema>;
