import { Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';

import { PrismaService } from 'src/prisma/prisma.service';

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
      throw new WsException('database connection error');
    }
  }

  async findUserByUsername(username: string) {
    try {
      return await this.prismaService.user.findUnique({
        where: { username },
        select: { id: true, username: true, password: true, deletedAt: true },
      });
    } catch (e) {
      throw new WsException('database connection error');
    }
  }
}
