import { ChatRoom as ChatRoomModel } from '@prisma/client';
import { IsOptional, IsString, MaxLength } from 'class-validator';

import { Common } from 'src/common/entities';

export class ChatRoom extends Common implements ChatRoomModel {
  id: number;

  @MaxLength(20)
  @IsString()
  name: string;

  @MaxLength(100)
  @IsOptional()
  @IsString()
  description: string | null;

  ownerUserId: number;
}
