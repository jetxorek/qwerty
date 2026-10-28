import { z } from 'zod';

export const ConnectionTypeSchema = z.enum([
  'family',
  'love',
  'service',
  'debt',
  'enmity',
  'other',
]);

export const PlayerConnectionSchema = z.object({
  id: z.string(),
  from: z.string(),
  to: z.string(),
  type: ConnectionTypeSchema,
});

export type PlayerConnection = z.infer<typeof PlayerConnectionSchema>;
export type ConnectionType = z.infer<typeof ConnectionTypeSchema>;
