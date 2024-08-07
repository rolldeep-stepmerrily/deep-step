import { Body, Controller, Post } from '@nestjs/common';

import { UsersService } from './users.service';
import { AuthService } from 'src/auth/auth.service';
import {
  CheckEmailForSignUpDto,
  CheckNicknameForSignUpDto,
  CheckPhoneNumberForSignUpDto,
  CheckUsernameForSignUpDto,
  CreateUserDto,
  SignInDto,
} from './users.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('signup/duplication/username')
  async checkUsernameForSignUp(@Body() checkUsernameForSignUpDto: CheckUsernameForSignUpDto) {
    return this.usersService.checkUsernameForSignUp(checkUsernameForSignUpDto);
  }

  @Post('signup/duplication/email')
  async checkEmailForSignUp(@Body() checkEmailForSignUpDto: CheckEmailForSignUpDto) {
    return this.usersService.checkEmailForSignUp(checkEmailForSignUpDto);
  }

  @Post('signup/duplication/nickname')
  async checkNicknameForSignUp(@Body() checkNicknameForSignUpDto: CheckNicknameForSignUpDto) {
    return this.usersService.checkNicknameForSignUp(checkNicknameForSignUpDto);
  }

  @Post('signup/duplication/phone')
  async checkPhoneNumberForSignUp(@Body() checkPhoneNumberForSignUpDto: CheckPhoneNumberForSignUpDto) {
    return this.usersService.checkPhoneNumberForSignUp(checkPhoneNumberForSignUpDto);
  }

  @Post('signup')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Post('signin')
  async signIn(@Body() { username, password }: SignInDto) {
    return await this.authService.signIn(username, password);
  }
}
