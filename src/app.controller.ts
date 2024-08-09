import { Controller, Get, Render } from '@nestjs/common';

const appLogo = `${process.env.AWS_CLOUDFRONT_DOMAIN}/assets/logos/deep-step-light-logo.png`;
const appName = 'deep-step';

@Controller()
export class AppController {
  @Get()
  @Render('index')
  index() {
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
}
