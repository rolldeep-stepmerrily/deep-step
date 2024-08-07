import { Module } from '@nestjs/common';

import { AuthModule } from 'src/auth/auth.module';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [AuthModule],
  providers: [ChatService, ChatGateway],
})
export class ChatModule {}
