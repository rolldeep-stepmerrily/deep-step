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
  async handleMessage(@MessageBody() content: string, @ConnectedSocket() client: Socket) {
    if (typeof content !== 'string' || !content.trim().length) {
      throw new WsException('invalid message');
    }

    const user = client.data.user as IJwtPayload;

    if (!user) {
      throw new WsException('unauthorized');
    }

    const message: IMessage = {
      id: uuidv4(),
      content,
      sender: { id: user.sub, username: user.username, nickname: user.nickname },
      createdAt: dayjs(),
    };

    this.chatService.addMessage(message);
    this.server.emit('receiveMessage', message);
    const messages = this.chatService.getMessages();

    console.log(messages);
  }
}
