import { Inject, Injectable, Logger } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { ConversationService } from '../conversation/conversation.service';
import { UserService } from '../user/user.service';
import { MessageDto } from './dto';
import { User } from '../user/user.type';

@Injectable()
export class ChatService {
  @Inject(UserService)
  private readonly userService: UserService;

  @Inject(ConversationService)
  private readonly conversationService: ConversationService;

  private readonly logger = new Logger(ChatService.name);

  async sendMessage(user: User, messageDto: MessageDto) {
    const toUser = await this.userService.getUser({ id: messageDto.to });
    if (!toUser) throw new WsException('User not found');

    const conversation = await this.conversationService.getConversation([
      user.id,
      messageDto.to,
    ]);

    this.logger.debug(conversation);
  }
}
