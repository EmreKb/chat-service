import { Inject, Injectable, Logger } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { ConversationService } from '../conversation/conversation.service';
import { UserService } from '../user/user.service';
import { MessageDto } from './dto';
import { User } from '../user/user.type';
import { MessageService } from '../message/message.service';

@Injectable()
export class ChatService {
  @Inject(UserService)
  private readonly userService: UserService;

  @Inject(ConversationService)
  private readonly conversationService: ConversationService;

  @Inject(MessageService)
  private readonly messageService: MessageService;

  private readonly logger = new Logger(ChatService.name);

  async sendMessage(user: User, messageDto: MessageDto) {
    const toUser = await this.userService.getUser({ id: messageDto.to });
    if (!toUser) throw new WsException('User not found');

    const conversation = await this.conversationService.getConversation([
      user.id,
      messageDto.to,
    ]);

    const message = await this.messageService.createMessage({
      content: messageDto.content,
      toUserId: toUser.id,
      fromUserId: user.id,
      conversationId: conversation.id,
    });

    this.logger.debug(
      `Sended message to ${message.fromUserId} to ${message.toUserId} | ${message.content}`,
    );

    return message;
  }
}
