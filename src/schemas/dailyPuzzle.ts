import { z } from 'zod';

export const PuzzleTypeSchema = z.enum(['item', 'cipher', 'secret']);

export const DailyPuzzleSchema = z.object({
  id: z.string(),
  type: PuzzleTypeSchema,
  title: z.string(),
  description: z.string(),
  hint: z.string().optional(),
  answer: z.string(),
  explanation: z.string(),
});

export type DailyPuzzle = z.infer<typeof DailyPuzzleSchema>;
export type PuzzleType = z.infer<typeof PuzzleTypeSchema>;
