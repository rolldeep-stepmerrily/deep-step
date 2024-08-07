import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { ChatService } from './chat.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/decorators';
import { CreateChatRoomDto } from './chat.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('chat-room')
  async createChatRoom(@User('id') userId: number, @Body() createChatRoomDto: CreateChatRoomDto) {
    return await this.chatService.createChatRoom(userId, createChatRoomDto);
  }
}
