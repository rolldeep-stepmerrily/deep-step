import { Injectable } from '@nestjs/common';
import { IMessage } from './chat.interface';

@Injectable()
export class ChatService {
  private messages: IMessage[] = [];

  addMessage(message: IMessage) {
    this.messages.push(message);
  }

  getMessages(): IMessage[] {
    return this.messages;
  }
}
