import { Module } from '@nestjs/common';
import { ConversationRepository } from './conversation.repository';
import { ConversationService } from './conversation.service';
import { ConversationController } from './conversation.controller';
import { UserModule } from '../user/user.module';

const providers = [ConversationRepository, ConversationService];

@Module({
  imports: [UserModule],
  controllers: [ConversationController],
  providers: [...providers],
  exports: [...providers],
})
export class ConversationModule {}
