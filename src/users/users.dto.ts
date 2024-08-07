import { IntersectionType, OmitType, PickType } from '@nestjs/mapped-types';
import { IsObject } from 'class-validator';

import { Profile, Term, User } from './entities';

export class CheckUsernameForSignUpDto extends PickType(User, ['username']) {}

export class CheckEmailForSignUpDto extends PickType(User, ['email'] as const) {}

export class CheckNicknameForSignUpDto extends PickType(Profile, ['nickname'] as const) {}

export class CheckPhoneNumberForSignUpDto extends PickType(User, ['phoneNumber'] as const) {}

export class CreateTermsDto extends OmitType(Term, ['id', 'createdAt', 'updatedAt', 'deletedAt'] as const) {}

export class CreateUserDto extends IntersectionType(
  PickType(User, ['username', 'password', 'name', 'email', 'phoneNumber'] as const),
  PickType(Profile, ['nickname'] as const),
) {
  @IsObject()
  terms: CreateTermsDto;
}

export class SignInDto extends PickType(User, ['username', 'password'] as const) {}
