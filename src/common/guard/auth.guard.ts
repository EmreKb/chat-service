import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from 'src/modules/user/user.service';

type TRequest = Request & { user: User };

export class AuthGuard implements CanActivate {
  @Inject(UserService) private readonly userService: UserService;

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<TRequest>();
    const authorization = request.headers['authorization'];
    if (!authorization)
      throw new BadRequestException('Authorization header is required');
    if (!authorization.startsWith('Bearer '))
      throw new BadRequestException(
        'Authorization hader must be start with Bearer',
      );
    let user = await this.userService.getUserByToken(String(authorization));
    user = await this.userService.getUser({ id: user.id });
    request.user = user;
    return true;
  }
}
