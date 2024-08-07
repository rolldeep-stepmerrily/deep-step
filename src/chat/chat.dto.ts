import { PickType } from '@nestjs/mapped-types';

import { ChatRoom } from './entities/chat-room.entity';

export class CreateChatRoomDto extends PickType(ChatRoom, ['name', 'description']) {}
