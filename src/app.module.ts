import { UserModule } from './modules/user/user.module';
import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { ChatModule } from './modules/chat/chat.module';

@Module({
  imports: [UserModule, CommonModule, ChatModule],
})
export class AppModule {}
