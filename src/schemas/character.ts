import { z } from 'zod';

export const VisibleFactsSchema = z.object({
  age: z.number(),
  occupation: z.string(),
  firstImpression: z.string(),
});

export const CharacterSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.enum(['detective', 'suspect', 'victim']),
  barOrder: z.number(),
  portraitId: z.string(),
  visibleFacts: VisibleFactsSchema,
});

export type Character = z.infer<typeof CharacterSchema>;
export type VisibleFacts = z.infer<typeof VisibleFactsSchema>;
export type CharacterRole = Character['role'];
