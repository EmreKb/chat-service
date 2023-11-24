import { Inject, Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { NestGateway } from '@nestjs/websockets/interfaces/nest-gateway.interface';
import { Server, Socket as SocketIO } from 'socket.io';
import { ExtendedError } from 'socket.io/dist/namespace';
import { ENV } from 'src/common/config';
import { UserService } from '../user/user.service';
import { User } from '../user/user.type';
import { ChatService } from './chat.service';
import { MessageDto } from './dto';

type Socket = SocketIO & { user: User };

@WebSocketGateway(ENV.SOCKET_PORT, { namespace: 'chat' })
export class ChatGateway
  implements
    OnGatewayConnection<Socket>,
    NestGateway,
    OnGatewayDisconnect<Socket>
{
  @Inject(ChatService) private readonly chatService: ChatService;
  @Inject(UserService) private readonly userService: UserService;
  @WebSocketServer() private readonly server: Server;

  private readonly logger = new Logger(ChatGateway.name);

  private sockets = new Map<string, Socket>();

  afterInit(server: Server) {
    server.use(async (socket: Socket, next: (err?: ExtendedError) => void) => {
      try {
        const authorization = socket.handshake.headers.authorization;
        const user = await this.userService.getUserByToken(authorization);
        socket.user = user;
        next();
      } catch (error) {
        if (error instanceof Error) this.logger.error(error);
        next(error);
      }
    });
  }

  handleConnection(socket: Socket) {
    this.logger.debug(`User Id ${socket.user.id} connected`);
    this.sockets.set(socket.user.id, socket);
  }

  handleDisconnect(socket: Socket) {
    this.logger.debug(`User id ${socket.user.id} disconnected`);
    this.sockets.delete(socket.user.id);
  }

  @SubscribeMessage('message')
  async message(
    @ConnectedSocket() socket: Socket,
    @MessageBody() messageDto: MessageDto,
  ) {
    const message = await this.chatService.sendMessage(socket.user, messageDto);
    socket.emit('message', message);
    this.sockets.get(message.toUserId)?.emit('message', message);
  }
}
