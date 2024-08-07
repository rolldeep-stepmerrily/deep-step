import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './users.dto';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findUserById(userId: number) {
    try {
      return await this.prismaService.user.findUnique({
        where: { id: userId },
        select: { id: true, deletedAt: true },
      });
    } catch (e) {
      console.error(e);

      throw new InternalServerErrorException();
    }
  }

  async findUserByUsername(username: string) {
    try {
      return await this.prismaService.user.findUnique({
        where: { username },
        select: { id: true, username: true, password: true, deletedAt: true, profile: { select: { nickname: true } } },
      });
    } catch (e) {
      console.error(e);

      throw new InternalServerErrorException();
    }
  }

  async findUserByEmail(email: string) {
    try {
      return await this.prismaService.user.findUnique({
        where: { email },
        select: { id: true, username: true, deletedAt: true },
      });
    } catch (e) {
      console.error(e);

      throw new InternalServerErrorException();
    }
  }

  async findUserByNickname(nickname: string) {
    try {
      return await this.prismaService.profile.findUnique({
        where: { nickname },
        select: { id: true },
      });
    } catch (e) {
      console.error(e);

      throw new InternalServerErrorException();
    }
  }

  async findUserByPhoneNumber(phoneNumber: string) {
    try {
      return await this.prismaService.user.findUnique({
        where: { phoneNumber },
        select: { id: true, deletedAt: true },
      });
    } catch (e) {
      console.error(e);

      throw new InternalServerErrorException();
    }
  }

  async createUser({ username, email, name, phoneNumber, password, terms, nickname }: CreateUserDto) {
    try {
      const { isService, isPrivacy, isPrivacyOption, isAge } = terms;

      return await this.prismaService.user.create({
        data: {
          username,
          email,
          name,
          phoneNumber,
          password,
          term: { create: { isService, isPrivacy, isPrivacyOption, isAge } },
          profile: { create: { nickname } },
        },
        select: { id: true },
      });
    } catch (e) {
      console.error(e);

      throw new InternalServerErrorException();
    }
  }
}
