import { z } from 'zod';

export const AccusationResultSchema = z.object({
  culpritId: z.string(),
  isCorrectCulprit: z.boolean(),
  score: z.number(),
  coverageCount: z.number().int(),
  coveredCategories: z.array(z.string()),
  verdict: z.enum(['full', 'partial', 'fail']),
});

export type AccusationResult = z.infer<typeof AccusationResultSchema>;
