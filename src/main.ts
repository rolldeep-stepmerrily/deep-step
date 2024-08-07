import { NestApplication, NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'));

  console.log(process.env.PORT);
  await app.listen(process.env.PORT);
}
bootstrap();
