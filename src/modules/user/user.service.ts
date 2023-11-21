import { Inject, Injectable } from '@nestjs/common';
import axios from 'axios';
import { ENV } from 'src/common/config';
import { User, UserResponse } from './user.type';
import { isNumber, isString } from 'class-validator';
import { UnsupportedResponseError } from 'src/common/error';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  @Inject(UserRepository) private readonly userRepository: UserRepository;

  async getUserByToken(token: string) {
    const response = await axios.get<UserResponse>(ENV.GET_USER_URL, {
      headers: {
        Authorization: token,
        'X-Key': ENV.KEY,
      },
    });
    this.validateResponse(response.data);
    return await this.getUser({ id: response.data.id.toString() });
  }

  async getUserById(id: string) {
    const response = await axios.get<UserResponse>(
      ENV.GET_USER_BY_ID_URL.replace('{id}', id),
      {
        headers: { 'X-Key': ENV.KEY },
      },
    );
    this.validateResponse(response.data);
    return await this.getUser({ id: response.data.id.toString() });
  }

  validateResponse({ id }: UserResponse) {
    const check = isString(id) || isNumber(id);
    if (!check) throw new UnsupportedResponseError();
  }

  async getUser(data: User) {
    const user = await this.userRepository.getById(data.id);
    if (user) return user;
    return await this.userRepository.create({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
