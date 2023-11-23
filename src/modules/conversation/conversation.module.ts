import { Module } from '@nestjs/common';
import { ConversationRepository } from './conversation.repository';
import { ConversationService } from './conversation.service';

const providers = [ConversationRepository, ConversationService];

@Module({
  imports: [],
  controllers: [],
  providers: [...providers],
  exports: [...providers],
})
export class ConversationModule {}
