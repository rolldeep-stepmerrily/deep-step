import { NestApplication, NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';

import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors';
import { HttpExceptionFilter } from './common/filters';

async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(AppModule);

  app.useGlobalInterceptors(new TransformInterceptor());

  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: false,
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  app.useStaticAssets(join(__dirname, '..', 'public'));

  await app.listen(process.env.PORT);
}
bootstrap();
