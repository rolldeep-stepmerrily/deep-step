import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';

import { ChatService } from './chat.service';
import { IJwtPayload, IMessage } from './chat.interface';
import { CreateMessageDto } from './chat.dto';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly chatService: ChatService,
    private readonly jwtService: JwtService,
  ) {}

  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.auth.token || client.handshake.headers['authorization']?.split(' ')[1];

      if (!token) {
        throw new WsException('unauthorized');
      }

      const payload = await this.jwtService.verifyAsync<IJwtPayload>(token);

      client.data.user = payload;
    } catch (e) {
      client.emit('error', 'authentication failed');

      client.disconnect();
    }
  }

  async handleDisconnect(client: Socket) {
    console.log(client.id);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(@MessageBody() data: CreateMessageDto, @ConnectedSocket() client: Socket) {
    if (typeof data.content !== 'string' || !data.content.trim().length) {
      throw new WsException('invalid message');
    }

    const user = client.data.user as IJwtPayload;

    if (!user) {
      throw new WsException('unauthorized');
    }

    const message: IMessage = {
      id: uuidv4(),
      chatRoomId: data.chatRoomId,
      sender: { id: user.sub, username: user.username, nickname: user.nickname },
      content: data.content,
      createdAt: dayjs(),
    };

    const createMessage = await this.chatService.createMessage(message);

    this.server.to(String(data.chatRoomId)).emit('receiveMessage', createMessage);
  }
}
