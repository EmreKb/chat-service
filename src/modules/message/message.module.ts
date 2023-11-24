import { UserModule } from '../user/user.module';
import { MessageController } from './message.controller';
import { MessageRepository } from './message.repository';
import { MessageService } from './message.service';
import { Module } from '@nestjs/common';

const providers = [MessageRepository, MessageService];

@Module({
  imports: [UserModule],
  controllers: [MessageController],
  providers: [...providers],
  exports: [...providers],
})
export class MessageModule {}
