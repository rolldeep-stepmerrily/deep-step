import { ChatRoom as ChatRoomModel } from '@prisma/client';
import { IsOptional, IsString } from 'class-validator';

import { Common } from 'src/common/entities';

export class ChatRoom extends Common implements ChatRoomModel {
  id: number;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string | null;
}
