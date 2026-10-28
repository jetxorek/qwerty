import { z } from 'zod';

const CipherPuzzleSchema = z.object({
  type: z.literal('cipher'),
  id: z.string(),
  title: z.string(),
  story: z.string(),
  cipherText: z.string(),
  correctAnswer: z.string(),
  hint: z.string().optional(),
  explanation: z.string(),
});

const ItemPuzzleSchema = z.object({
  type: z.literal('item'),
  id: z.string(),
  title: z.string(),
  story: z.string(),
  location: z.string(),
  timePeriod: z.string(),
  task: z.string(),
  items: z.array(z.string()).min(3),
  oddItem: z.string(),
  explanation: z.string(),
});

const SecretTestimonialSchema = z.object({
  speaker: z.string(),
  text: z.string(),
});

const SecretPuzzleSchema = z.object({
  type: z.literal('secret'),
  id: z.string(),
  title: z.string(),
  story: z.string(),
  location: z.string().optional(),
  testimonials: z.array(SecretTestimonialSchema).min(2),
  options: z.array(z.string()).min(2),
  correctAnswer: z.string(),
  explanation: z.string(),
});

export const DailyPuzzleSchema = z.discriminatedUnion('type', [
  CipherPuzzleSchema,
  ItemPuzzleSchema,
  SecretPuzzleSchema,
]);

export type DailyPuzzle = z.infer<typeof DailyPuzzleSchema>;
export type CipherPuzzle = z.infer<typeof CipherPuzzleSchema>;
export type ItemPuzzle = z.infer<typeof ItemPuzzleSchema>;
export type SecretPuzzle = z.infer<typeof SecretPuzzleSchema>;
export type SecretTestimonial = z.infer<typeof SecretTestimonialSchema>;
