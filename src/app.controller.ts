import { Controller, Get, Render } from '@nestjs/common';

const appName = 'deep-step';

@Controller()
export class AppController {
  @Get()
  @Render('index')
  index() {
    return { appName, styles: ['index'], scripts: ['index'] };
  }

  @Get('signup')
  @Render('signup')
  signup() {
    return { appName, styles: ['signup'], scripts: ['signup'] };
  }
}
