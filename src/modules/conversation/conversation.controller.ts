import { Controller, Get, Inject, Query, UseGuards } from '@nestjs/common';
import { PaginationQueryDto } from 'src/common/dto';
import { AuthGuard } from 'src/common/guard';
import { ConversationService } from './conversation.service';
import { GetUser } from 'src/common/decorator';
import { User } from '@prisma/client';

@Controller('conversation')
export class ConversationController {
  @Inject(ConversationService)
  private readonly conversationService: ConversationService;

  @UseGuards(AuthGuard)
  @Get()
  async getConversations(
    @GetUser() user: User,
    @Query() paginationQueryDto: PaginationQueryDto,
  ) {
    return await this.conversationService.getLastConversations(user.id, {
      page: +paginationQueryDto.page,
      limit: +paginationQueryDto.limit,
    });
  }
}
