import { Inject, Injectable } from '@nestjs/common';
import { MessageRepository } from './message.repository';
import { CreateMessage } from './message.type';
import { User } from '@prisma/client';
import { PaginationQueryDto } from 'src/common/dto';

@Injectable()
export class MessageService {
  @Inject(MessageRepository) messageRepository: MessageRepository;

  async createMessage(data: CreateMessage) {
    return await this.messageRepository.createMessage(data);
  }

  async getMessageHistory(
    user: User,
    id: string,
    paginationQueryDto: PaginationQueryDto,
  ) {
    return await this.messageRepository.getLastMessages(
      user.id,
      id,
      paginationQueryDto,
    );
  }
}
