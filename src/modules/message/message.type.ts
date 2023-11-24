import { Message as MessageModel } from '@prisma/client';

export type Message = Omit<MessageModel, 'id' | 'createdAt' | 'updatedAt'>;

export type CreateMessage = Pick<
  Message,
  'content' | 'fromUserId' | 'toUserId' | 'conversationId'
>;
