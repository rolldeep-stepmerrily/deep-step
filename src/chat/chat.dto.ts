import { PickType } from '@nestjs/mapped-types';

import { ChatRoom, Message } from './entities';

export class CreateChatRoomDto extends PickType(ChatRoom, ['name', 'description'] as const) {}

export class CreateMessageDto extends PickType(Message, ['chatRoomId', 'content'] as const) {}
