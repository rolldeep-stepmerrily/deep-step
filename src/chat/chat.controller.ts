import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ChatService } from './chat.service';
import { User } from 'src/auth/decorators';
import { CreateChatRoomDto } from './chat.dto';
import { ParsePositiveIntPipe } from 'src/common/pipes';

@UseGuards(AuthGuard('jwt'))
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('room')
  async createChatRoom(@User('id') userId: number, @Body() createChatRoomDto: CreateChatRoomDto) {
    return await this.chatService.createChatRoom(userId, createChatRoomDto);
  }

  @Post('join/:id')
  async joinChatRoom(@User('id') userId: number, @Param('id', ParsePositiveIntPipe) chatRoomId: number) {
    await this.chatService.joinChatRoom(userId, chatRoomId);
  }

  @Post('leave/:id')
  async leaveChatRoom(@User('id') userId: number, @Param('id', ParsePositiveIntPipe) chatRoomId: number) {
    await this.chatService.leaveChatRoom(userId, chatRoomId);
  }

  @Get('rooms/all')
  async findAllChatRooms() {
    return await this.chatService.findAllChatRooms();
  }

  @Get('rooms')
  async findUserChatRooms(@User('id') userId: number) {
    return await this.chatService.findUserChatRooms(userId);
  }

  @Get('rooms/:id')
  async findUserChatRoom(@User('id') userId: number, @Param('id', ParsePositiveIntPipe) chatRoomId: number) {
    return await this.chatService.findUserChatRoom(userId, chatRoomId);
  }
}
