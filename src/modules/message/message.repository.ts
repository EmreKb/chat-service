import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/service';
import { CreateMessage } from './message.type';
import { PaginationQueryDto } from 'src/common/dto';

@Injectable()
export class MessageRepository {
  @Inject(PrismaService) private readonly prismaService: PrismaService;

  async createMessage(data: CreateMessage) {
    return await this.prismaService.message.create({ data });
  }

  async getLastMessages(
    id: string,
    toId: string,
    paginationQueryDto: PaginationQueryDto,
  ) {
    return await this.prismaService.message.findMany({
      where: {
        OR: [
          { fromUserId: id, toUserId: toId },
          { fromUserId: toId, toUserId: id },
        ],
      },
      take: paginationQueryDto.limit,
      skip: (paginationQueryDto.page - 1) * paginationQueryDto.limit,
      orderBy: { createdAt: 'desc' },
    });
  }
}
