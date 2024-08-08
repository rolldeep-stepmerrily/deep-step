import { Controller, Get, Render } from '@nestjs/common';

const { AWS_CLOUDFRONT_DOMAIN } = process.env;

const appLogo = `${AWS_CLOUDFRONT_DOMAIN}/assets/logos/deep-step-light-logo.png`;
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
}
