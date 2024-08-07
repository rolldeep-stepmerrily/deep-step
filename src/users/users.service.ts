import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

import { UsersRepository } from './users.repository';
import {
  CheckEmailForSignUpDto,
  CheckNicknameForSignUpDto,
  CheckPhoneNumberForSignUpDto,
  CheckUsernameForSignUpDto,
  CreateUserDto,
} from './users.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async checkUsernameForSignUp({ username }: CheckUsernameForSignUpDto) {
    const user = await this.usersRepository.findUserByUsername(username);

    if (user) {
      throw new ConflictException('이미 존재하는 아이디 입니다.');
    }
  }

  async checkEmailForSignUp({ email }: CheckEmailForSignUpDto) {
    const user = await this.usersRepository.findUserByEmail(email);

    if (user) {
      throw new ConflictException('해당 이메일로 가입된 계정이 존재합니다.');
    }
  }

  async checkNicknameForSignUp({ nickname }: CheckNicknameForSignUpDto) {
    const user = await this.usersRepository.findUserByNickname(nickname);

    if (user) {
      throw new ConflictException('해당 닉네임으로 가입된 계정이 존재합니다.');
    }
  }

  async checkPhoneNumberForSignUp({ phoneNumber }: CheckPhoneNumberForSignUpDto) {
    const user = await this.usersRepository.findUserByPhoneNumber(phoneNumber);

    if (user) {
      throw new ConflictException('해당 전화번로 가입된 계정이 존재합니다.');
    }
  }

  async createUser({ username, email, password, name, nickname, phoneNumber, terms }: CreateUserDto) {
    if (!terms.isService || !terms.isPrivacy || !terms.isAge) {
      throw new BadRequestException('약관에 동의해주세요.');
    }

    await Promise.all([
      this.checkUsernameForSignUp({ username }),
      this.checkEmailForSignUp({ email }),
      this.checkNicknameForSignUp({ nickname }),
      this.checkPhoneNumberForSignUp({ phoneNumber }),
    ]);

    const hashedPassword = await bcrypt.hash(password, 10);

    return this.usersRepository.createUser({
      username,
      password: hashedPassword,
      name,
      nickname,
      email,
      phoneNumber,
      terms,
    });
  }
}
