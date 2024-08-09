import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
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
      throw new NotFoundException('계정이 존재하지 않습니다.');
    }

    const isValidatePassword = await bcrypt.compare(password, user.password);

    if (!isValidatePassword) {
      throw new BadRequestException('비밀번호를 다시 확인해주세요.');
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
