import { Profile as ProfileModel } from '@prisma/client';
import { IsString } from 'class-validator';

import { Common } from 'src/common/entities';

export class Profile extends Common implements ProfileModel {
  id: number;

  @IsString()
  nickname: string;

  avatar: string | null;

  @IsString()
  status: string | null;
}
