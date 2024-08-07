import { $Enums, User as UserModel } from '@prisma/client';
import { IsEmail, IsEnum, IsMobilePhone, IsString, Length, Matches } from 'class-validator';

import { Common } from 'src/common/entities';

export class User extends Common implements UserModel {
  id: number;

  @Matches(/^[a-zA-Z0-9]{4,16}$/)
  username: string;

  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[`~!@#$%^&*()_=+])[A-Za-z\d`~!@#$%^&*()_=+]{8,16}$/)
  password: string;

  @IsEmail()
  email: string;

  @Length(2, 6)
  @IsString()
  name: string;

  @IsMobilePhone('ko-KR')
  phoneNumber: string;

  @IsEnum($Enums.Role)
  role: $Enums.Role;
}
