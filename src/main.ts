import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { engine } from 'express-handlebars';
import helmet from 'helmet';
import expressBasicAuth from 'express-basic-auth';

import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors';
import { NextFunction, Request, Response } from 'express';

const { NODE_ENV, PORT, AWS_CLOUDFRONT_DOMAIN, GUEST_NAME, GUEST_PASSWORD } = process.env;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalInterceptors(new TransformInterceptor());

  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: false,
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  const pages = ['/', '/signup', '/chat-room-list', '/chat-room-create', '/chat-room/:id'];

  app.setGlobalPrefix('api', { exclude: pages });

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));

  app.engine(
    'hbs',
    engine({
      extname: 'hbs',
      defaultLayout: 'main',
      layoutsDir: join(__dirname, '..', 'views/layouts'),
      partialsDir: join(__dirname, '..', 'views/partials'),
    }),
  );
  app.setViewEngine('hbs');

  app.use('/', (req: Request, res: Response, next: NextFunction) => {
    if (req.path === '/' || req.path === '/index.html') {
      return expressBasicAuth({ challenge: true, users: { [GUEST_NAME]: GUEST_PASSWORD } })(req, res, next);
    }
    next();
  });

  if (NODE_ENV === 'production') {
    app.use(
      helmet({
        contentSecurityPolicy: {
          directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", 'unpkg.com', 'cdn.socket.io'],
            styleSrc: ["'self'", "'unsafe-inline'", 'cdnjs.cloudflare.com'],
            fontSrc: ["'self'", 'cdnjs.cloudflare.com'],
            imgSrc: ["'self'", 'data:', `${AWS_CLOUDFRONT_DOMAIN}`, 'cdnjs.cloudflare.com'],
          },
        },
      }),
    );
  }

  await app.listen(PORT);
}
bootstrap();
