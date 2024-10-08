import { Dayjs } from 'dayjs';

export interface IJwtPayload {
  sub: number;
  username: string;
  nickname: string;
}

interface ISender {
  id: number;
  username: string;
  nickname: string;
}

export interface IMessage {
  id: string;
  chatRoomId: number;
  content: string;
  sender: ISender;
  createdAt: Dayjs;
}
