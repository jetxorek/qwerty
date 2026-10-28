import { z } from 'zod';

export const CaseCharacterSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.enum(['detective', 'suspect', 'victim']),
  description: z.string(),
  motive: z.string().optional(),
  alibi: z.string().optional(),
});

export const KeyEvidenceSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  pointsTo: z.string().optional(),
});

export const CaseDraftSchema = z.object({
  title: z.string().min(1, 'Название обязательно'),
  description: z.string().min(1, 'Описание обязательно'),
  characters: z.array(CaseCharacterSchema).min(2, 'Минимум 2 персонажа'),
  murdererId: z.string(),
  keyEvidence: z.array(KeyEvidenceSchema).min(1, 'Минимум одна улика'),
});

export type CaseDraft = z.infer<typeof CaseDraftSchema>;
export type CaseCharacter = z.infer<typeof CaseCharacterSchema>;
export type KeyEvidence = z.infer<typeof KeyEvidenceSchema>;
