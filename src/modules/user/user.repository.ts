import { Inject, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/common/service';
import type { User } from '@prisma/client';

@Injectable()
export class UserRepository {
  @Inject(PrismaService) private readonly prismaService: PrismaService;

  private readonly logger = new Logger(UserRepository.name);

  async create(user: User) {
    return await this.prismaService.user.create({ data: user });
  }

  async getById(id: string) {
    return await this.prismaService.user.findUnique({ where: { id } });
  }
}
