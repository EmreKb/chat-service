import { Inject, Injectable, Logger } from '@nestjs/common';
import { PaginationQueryDto } from 'src/common/dto';
import { PrismaService } from 'src/common/service';

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
      select: { users: true, id: true },
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
      select: { users: true, id: true },
    });
  }

  async getLastConversations(
    id: string,
    paginationQueryDto: PaginationQueryDto,
  ) {
    return await this.prismaService.user.findUnique({
      where: { id },
      select: {
        conversations: {
          select: { messages: { take: 1, orderBy: { createdAt: 'desc' } } },
          take: paginationQueryDto.limit,
          skip: (paginationQueryDto.page - 1) * paginationQueryDto.limit,
        },
      },
    });
  }
}
