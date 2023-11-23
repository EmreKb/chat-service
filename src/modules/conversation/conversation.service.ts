import { Inject, Injectable } from '@nestjs/common';
import { ConversationRepository } from './conversation.repository';

@Injectable()
export class ConversationService {
  @Inject(ConversationRepository)
  private readonly conversationRepository: ConversationRepository;

  async getConversation(ids: string[]) {
    const conversation = await this.conversationRepository.getConversation(ids);
    if (conversation) return conversation;
    return await this.conversationRepository.create(ids);
  }
}
