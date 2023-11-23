import { Inject, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/common/service';
import { Conversation } from './conversation.type';

@Injectable()
export class ConversationRepository {
  @Inject(PrismaService) private readonly prismaService: PrismaService;

  private readonly logger = new Logger(ConversationRepository.name);

  async create(ids: string[]) {
    if (ids.length !== 2) return;
    return await this.prismaService.conversation.create({
      data: {
        users: {
          connect: ids.map((e) => ({
            id: e,
          })),
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      select: { users: true },
    });
  }

  async getConversation(ids: string[]) {
    if (ids.length !== 2) return;
    return await this.prismaService.conversation.findFirst({
      where: {
        users: {
          every: {
            id: { in: ids },
          },
        },
      },
      select: { users: true },
    });
  }
}
