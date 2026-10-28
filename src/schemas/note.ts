import { z } from 'zod';

export const NoteCategorySchema = z.enum([
  'motive',
  'alibi',
  'psychology',
  'evidence',
  'witness',
  'timeline',
  'other',
]);

export const NoteTruthSchema = z.enum(['true', 'false', 'plausible']);

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

export type Note = z.infer<typeof NoteSchema>;
export type NoteCategory = z.infer<typeof NoteCategorySchema>;
export type NoteTruth = z.infer<typeof NoteTruthSchema>;
