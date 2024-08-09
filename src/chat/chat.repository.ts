import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import dayjs from 'dayjs';

import { PrismaService } from 'src/prisma/prisma.service';
import { IMessage } from './chat.interface';

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

  async findChatRoomById(chatRoomId: number) {
    try {
      return await this.prismaService.chatRoom.findUnique({
        where: { id: chatRoomId, deletedAt: null },
        select: { id: true },
      });
    } catch (e) {
      console.error(e);

      throw new InternalServerErrorException();
    }
  }

  async findChatRoomUser(userId: number, chatRoomId: number) {
    try {
      return await this.prismaService.chatRoomUser.findUnique({
        where: { userId_chatRoomId: { userId, chatRoomId } },
        select: { id: true },
      });
    } catch (e) {
      console.error(e);

      throw new InternalServerErrorException();
    }
  }

  async joinChatRoom(userId: number, chatRoomId: number) {
    try {
      return await this.prismaService.chatRoomUser.create({ data: { userId, chatRoomId }, select: { id: true } });
    } catch (e) {
      console.error(e);

      if (e.code === 'P2002') {
        throw new ConflictException('already joined this chat room');
      }

      throw new InternalServerErrorException();
    }
  }

  async leaveChatRoom(userId: number, chatRoomId: number) {
    try {
      return await this.prismaService.chatRoomUser.update({
        where: { userId_chatRoomId: { userId, chatRoomId } },
        data: { deletedAt: dayjs().toISOString() },
      });
    } catch (e) {
      console.error(e);

      if (e.code === 'P2025') {
        throw new ConflictException('not joined this chat room');
      }

      throw new InternalServerErrorException();
    }
  }

  async createMessage({ id, chatRoomId, sender, content, createdAt }: IMessage) {
    try {
      const { id: userId } = sender;
      return await this.prismaService.message.create({
        data: { id, chatRoomId, userId, content, createdAt: dayjs(createdAt).toISOString() },
        select: { id: true },
      });
    } catch (e) {
      console.error(e);

      throw new InternalServerErrorException();
    }
  }

  async findAllChatRooms() {
    try {
      return await this.prismaService.chatRoom.findMany({
        where: { deletedAt: null },
        select: { id: true, name: true, description: true, chatRoomUsers: { select: { userId: true } } },
      });
    } catch (e) {
      console.error(e);

      throw new InternalServerErrorException();
    }
  }

  async findUserChatRooms(userId: number) {
    try {
      return await this.prismaService.chatRoom.findMany({
        where: { chatRoomUsers: { some: { userId, deletedAt: null } }, deletedAt: null },
        select: {
          id: true,
          name: true,
          description: true,
          createdAt: true,
          _count: { select: { chatRoomUsers: { where: { deletedAt: null } } } },
        },
        orderBy: { updatedAt: 'desc' },
      });
    } catch (e) {
      console.error(e);

      throw new InternalServerErrorException();
    }
  }

  async findUserChatRoom(userId: number, chatRoomId: number) {
    try {
      return await this.prismaService.chatRoom.findUnique({
        where: { id: chatRoomId, chatRoomUsers: { some: { userId, deletedAt: null } }, deletedAt: null },
        select: {
          id: true,
          name: true,
          description: true,
          createdAt: true,
          chatRoomUsers: {
            where: { deletedAt: null },
            select: { user: { select: { id: true, profile: { select: { avatar: true, nickname: true } } } } },
          },
          messages: {
            where: { deletedAt: null },
            orderBy: { createdAt: 'asc' },
            select: {
              id: true,
              user: { select: { profile: { select: { avatar: true, nickname: true } } } },
              content: true,
              createdAt: true,
            },
          },
          _count: { select: { chatRoomUsers: { where: { deletedAt: null } } } },
        },
      });
    } catch (e) {
      console.error(e);

      throw new InternalServerErrorException();
    }
  }
}
