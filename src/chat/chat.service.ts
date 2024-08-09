import { Injectable, NotFoundException } from '@nestjs/common';

import { ChatRepository } from './chat.repository';
import { IMessage } from './chat.interface';
import { CreateChatRoomDto } from './chat.dto';

@Injectable()
export class ChatService {
  constructor(private readonly chatRepository: ChatRepository) {}
  private messages: IMessage[] = [];

  async findAllChatRooms() {
    const chatRooms = await this.chatRepository.findAllChatRooms();

    return { chatRooms };
  }

  async findUserChatRooms(userId: number) {
    const chatRooms = await this.chatRepository.findUserChatRooms(userId);

    return { chatRooms };
  }

  async findUserChatRoom(userId: number, chatRoomId: number) {
    const chatRoom = await this.chatRepository.findUserChatRoom(userId, chatRoomId);

    if (!chatRoom) {
      throw new NotFoundException();
    }

    return { chatRoom };
  }

  async findChatRoomById(chatRoomId: number) {
    return await this.chatRepository.findChatRoomById(chatRoomId);
  }

  async createChatRoom(userId: number, createChatRoomDto: CreateChatRoomDto) {
    const { name, description } = createChatRoomDto;

    const chatRoom = await this.chatRepository.createChatRoom(userId, name, description);

    return { chatRoom };
  }

  async joinChatRoom(userId: number, chatRoomId: number) {
    const chatRoom = await this.chatRepository.findChatRoomById(chatRoomId);

    if (!chatRoom) {
      throw new NotFoundException();
    }

    const findChatRoomUser = await this.chatRepository.findChatRoomUser(userId, chatRoomId);

    if (!findChatRoomUser) {
      return await this.chatRepository.joinChatRoom(userId, chatRoomId);
    }
  }

  async leaveChatRoom(userId: number, chatRoomId: number) {
    const chatRoom = await this.chatRepository.findChatRoomById(chatRoomId);

    if (!chatRoom) {
      throw new NotFoundException();
    }

    return await this.chatRepository.leaveChatRoom(userId, chatRoomId);
  }

  async createMessage(message: IMessage) {
    return await this.chatRepository.createMessage(message);
  }

  async findMessages(userId: number, chatRoomId: number) {
    const findChatRoomUser = await this.chatRepository.findChatRoomUser(userId, chatRoomId);

    if (!findChatRoomUser) {
      throw new NotFoundException();
    }

    return await this.chatRepository.findMessages(userId, chatRoomId);
  }
}
