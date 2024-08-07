import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChatRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createChatRoom(userId: number, name: string, description: string | null) {
    try {
      return await this.prismaService.chatRoom.create({
        data: { name, description, chatRoomUsers: { create: { userId } } },
        select: { id: true },
      });
    } catch (e) {
      console.error(e);

      throw new InternalServerErrorException();
    }
  }
}
