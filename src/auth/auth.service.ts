import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WsException } from '@nestjs/websockets';
import bcrypt from 'bcrypt';

import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string) {
    const user = await this.usersRepository.findUserByUsername(username);

    if (!user || user.deletedAt) {
      throw new WsException('user not found');
    }

    const isValidatePassword = await bcrypt.compare(password, user.password);

    if (!isValidatePassword) {
      throw new WsException('password is not correct');
    }

    const payload = {
      sub: user.id,
      username: user.username,
      nickname: user.profile?.nickname,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
