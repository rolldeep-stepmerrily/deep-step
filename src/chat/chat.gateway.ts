import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';

import { ChatService } from './chat.service';
import { IJwtPayload, IMessage } from './chat.interface';
import dayjs from 'dayjs';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly chatService: ChatService,
    private readonly jwtService: JwtService,
  ) {}

  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.query.token as string;
      const payload = this.jwtService.verify(token) as IJwtPayload;
      client.data.user = payload;
    } catch (e) {
      console.error('invalid token');

      client.disconnect();
    }
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(@MessageBody() content: string, @ConnectedSocket() client: Socket) {
    const user = client.data.user as IJwtPayload;

    if (!user) {
      throw new WsException('Unauthorized');
    }

    const message: IMessage = {
      id: uuidv4(),
      content,
      sender: {
        id: user.sub,
        username: user.username,
        nickname: user.nickname,
      },
      createdAt: dayjs(),
    };

    this.chatService.addMessage(message);
    this.server.emit('receiveMessage', message);
    const messages = this.chatService.getMessages();

    console.log(messages);
  }
}
