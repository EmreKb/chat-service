import { MessageRepository } from './message.repository';
import { MessageService } from './message.service';
import { Module } from '@nestjs/common';

const providers = [MessageRepository, MessageService];

@Module({
  imports: [],
  controllers: [],
  providers: [...providers],
  exports: [...providers],
})
export class MessageModule {}
