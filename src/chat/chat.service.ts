import { Injectable, NotFoundException } from '@nestjs/common';

import { ChatRepository } from './chat.repository';
import { IMessage } from './chat.interface';
import { CreateChatRoomDto } from './chat.dto';

@Injectable()
export class ChatService {
  constructor(private readonly chatRepository: ChatRepository) {}
  private messages: IMessage[] = [];

  async addMessage(message: IMessage) {
    this.messages.push(message);
  }

  async getMessages() {
    return this.messages;
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

    return await this.chatRepository.joinChatRoom(userId, chatRoomId);
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
}
