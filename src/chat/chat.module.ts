import { Module } from '@nestjs/common';

import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { ChatRepository } from './chat.repository';
import { ChatController } from './chat.controller';

@Module({
  imports: [AuthModule, PrismaModule],
  providers: [ChatService, ChatGateway, ChatRepository],
  controllers: [ChatController],
  exports: [ChatService],
})
export class ChatModule {}
