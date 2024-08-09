import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { engine } from 'express-handlebars';

import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors';
import helmet from 'helmet';

const { NODE_ENV, PORT, AWS_CLOUDFRONT_DOMAIN } = process.env;

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

  const pages = ['/', '/signup', '/chat-room-list'];

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

  if (NODE_ENV === 'production') {
    app.use(
      helmet({
        contentSecurityPolicy: {
          directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", 'unpkg.com'],
            imgSrc: ["'self'", 'data:', `${AWS_CLOUDFRONT_DOMAIN}`],
          },
        },
      }),
    );
  }

  await app.listen(PORT);
}
bootstrap();
