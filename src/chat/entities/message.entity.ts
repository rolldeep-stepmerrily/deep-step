import { Message as MessageModel } from '@prisma/client';
import { IsPositive, IsString } from 'class-validator';

import { Common } from 'src/common/entities';

export class Message extends Common implements MessageModel {
  id: string;

  @IsPositive()
  chatRoomId: number;

  @IsPositive()
  userId: number;

  @IsString()
  content: string;
}
