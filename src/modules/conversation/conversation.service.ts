import { Inject, Injectable } from '@nestjs/common';
import { ConversationRepository } from './conversation.repository';
import { PaginationQueryDto } from 'src/common/dto';

@Injectable()
export class ConversationService {
  @Inject(ConversationRepository)
  private readonly conversationRepository: ConversationRepository;

  async getConversation(ids: string[]) {
    const conversation = await this.conversationRepository.getConversation(ids);
    if (conversation) return conversation;
    return await this.conversationRepository.create(ids);
  }

  async getLastConversations(
    id: string,
    paginationQueryDto: PaginationQueryDto,
  ) {
    const lastConversations =
      await this.conversationRepository.getLastConversations(
        id,
        paginationQueryDto,
      );
    return lastConversations.conversations
      .filter((e) => e.messages.length == 1)
      .map((e) => e.messages[0]);
  }
}
