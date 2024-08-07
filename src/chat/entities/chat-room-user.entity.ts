import { ChatRoomUser as ChatRoomUserModel } from '@prisma/client';
import { IsPositive } from 'class-validator';

import { Common } from 'src/common/entities';

export class ChatRoomUser extends Common implements ChatRoomUserModel {
  id: number;

  @IsPositive()
  chatRoomId: number;

  @IsPositive()
  userId: number;
}
