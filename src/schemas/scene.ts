import { z } from 'zod';

const NarrationNodeSchema = z.object({
  type: z.literal('narration'),
  text: z.string(),
  next: z.string().optional(),
});

const DialogueNodeSchema = z.object({
  type: z.literal('dialogue'),
  speakerId: z.string(),
  text: z.string(),
  next: z.string().optional(),
});

const ChoiceNodeSchema = z.object({
  type: z.literal('choice'),
  prompt: z.string(),
  options: z.array(
    z.object({
      text: z.string(),
      nextNodeId: z.string(),
    })
  ).min(2),
});

export const SceneNodeSchema = z.discriminatedUnion('type', [
  NarrationNodeSchema,
  DialogueNodeSchema,
  ChoiceNodeSchema,
]);

export type SceneNode = z.infer<typeof SceneNodeSchema>;

export const SceneSchema = z.object({
  id: z.string(),
  title: z.string(),
  intro: z.string(),
  background: z.string(),
  startNodeId: z.string(),
  nodes: z.record(z.string(), SceneNodeSchema),
  nextSceneId: z.string().optional(),
});

export type Scene = z.infer<typeof SceneSchema>;

export const SceneGraphSchema = z.record(z.string(), SceneSchema);

export type SceneGraph = z.infer<typeof SceneGraphSchema>;
