import type { Conversation as ConversationModel } from '@prisma/client';

export type Conversation = Omit<
  ConversationModel,
  'id' | 'createdAt' | 'updatedAt'
>;
