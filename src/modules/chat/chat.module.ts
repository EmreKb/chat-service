import { ChatService } from './chat.service';
import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { UserModule } from '../user/user.module';
import { ConversationModule } from '../conversation/conversation.module';
import { MessageModule } from '../message/message.module';

@Module({
  imports: [UserModule, ConversationModule, MessageModule],
  providers: [ChatService, ChatGateway],
})
export class ChatModule {}
