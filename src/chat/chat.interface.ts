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
  content: string;
  sender: ISender;
  createdAt: Dayjs;
}
