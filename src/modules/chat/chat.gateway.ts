import { Inject, Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
} from '@nestjs/websockets';
import { NestGateway } from '@nestjs/websockets/interfaces/nest-gateway.interface';
import { Server, Socket as SocketIO } from 'socket.io';
import { ExtendedError } from 'socket.io/dist/namespace';
import { ENV } from 'src/common/config';
import { UserService } from '../user/user.service';
import { User } from '../user/user.type';

type Socket = SocketIO & { user: User };

@WebSocketGateway(ENV.SOCKET_PORT, { namespace: 'chat' })
export class ChatGateway
  implements
    OnGatewayConnection<Socket>,
    NestGateway,
    OnGatewayDisconnect<Socket>
{
  @Inject(UserService) private readonly userService: UserService;

  private readonly logger = new Logger(ChatGateway.name);

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

  async handleConnection(client: Socket) {}

  async handleDisconnect(client: Socket) {}
}
