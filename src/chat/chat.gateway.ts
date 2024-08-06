import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { ChatService } from './chat.service';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('sendMessage')
  async handleMessage(@MessageBody() message: string, @ConnectedSocket() client: Socket) {
    const userName = client.data.userName || '익명';
    const messageData = `${userName} : ${message}`;
    this.chatService.addMessage(messageData);
    this.server.emit('receiveMessage', messageData);
    const messages = this.chatService.getMessages();

    console.log(messages);
  }

  @SubscribeMessage('setUserName')
  handleSetUserName(@MessageBody() userName: string, @ConnectedSocket() client: Socket) {
    client.data.userName = userName;
  }
}
