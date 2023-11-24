import { Inject, Injectable } from '@nestjs/common';
import { MessageRepository } from './message.repository';
import { CreateMessage } from './message.type';

@Injectable()
export class MessageService {
  @Inject(MessageRepository) messageRepository: MessageRepository;

  async createMessage(data: CreateMessage) {
    return await this.messageRepository.createMessage(data);
  }
}
