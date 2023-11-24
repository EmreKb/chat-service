import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/service';
import { CreateMessage } from './message.type';

@Injectable()
export class MessageRepository {
  @Inject(PrismaService) private readonly prismaService: PrismaService;

  async createMessage(data: CreateMessage) {
    return await this.prismaService.message.create({ data });
  }
}
