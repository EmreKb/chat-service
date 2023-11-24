import { MessageModule } from './modules/message/message.module';
import { ConversationModule } from './modules/conversation/conversation.module';
import { UserModule } from './modules/user/user.module';
import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { ChatModule } from './modules/chat/chat.module';

@Module({
  imports: [
    MessageModule,
    ConversationModule,
    UserModule,
    CommonModule,
    ChatModule,
  ],
})
export class AppModule {}
