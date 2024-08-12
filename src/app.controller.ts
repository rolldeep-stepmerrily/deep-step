import { Controller, Get, NotFoundException, Param, Render } from '@nestjs/common';

import { ChatService } from './chat/chat.service';
import { ParsePositiveIntPipe } from './common/pipes';

const appLogo = `${process.env.AWS_CLOUDFRONT_DOMAIN}/assets/logos/deep-step-light-logo.png`;
const appName = 'deep-step';

@Controller()
export class AppController {
  constructor(private readonly chatService: ChatService) {}
  @Get()
  @Render('index')
  index() {
    console.log(process.env.AWS_CLOUDFRONT_DOMAIN);
    console.log(appLogo);
    return { appLogo, appName, styles: ['index'], scripts: ['index'] };
  }

  @Get('signup')
  @Render('signup')
  signup() {
    return { appName, styles: ['signup'], scripts: ['signup'] };
  }

  @Get('chat-room-list')
  @Render('chat-room-list')
  chatRoomList() {
    return { appName, styles: ['chat-room-list'], scripts: ['chat-room-list'] };
  }

  @Get('chat-room-create')
  @Render('chat-room-create')
  chatRoomCreate() {
    return { appName, styles: ['chat-room-create'], scripts: ['chat-room-create'] };
  }

  @Get('chat-room/:id')
  @Render('chat-room')
  async chatRoom(@Param('id', ParsePositiveIntPipe) chatRoomId: number) {
    const chatRoom = await this.chatService.findChatRoomById(chatRoomId);

    if (!chatRoom) {
      throw new NotFoundException();
    }

    const { name: chatRoomName } = chatRoom;

    return { appName, styles: ['chat-room'], scripts: ['chat-room'], chatRoomName };
  }
}
