import {
  Controller,
  Get,
  Inject,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/common/decorator';
import { PaginationQueryDto } from 'src/common/dto';
import { MessageService } from './message.service';
import { AuthGuard } from 'src/common/guard';

@Controller('message')
export class MessageController {
  @Inject(MessageService) private readonly messageService: MessageService;

  @UseGuards(AuthGuard)
  @Get(':id')
  async getMessageHistory(
    @GetUser() user: User,
    @Param('id') id: string,
    @Query() paginationQueryDto: PaginationQueryDto,
  ) {
    return await this.messageService.getMessageHistory(user, id, {
      limit: +paginationQueryDto.limit,
      page: +paginationQueryDto.page,
    });
  }
}
