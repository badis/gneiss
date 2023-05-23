import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';

import { User } from '@/users/entities';
import { UsersService } from '@/users/users.service';

import { AuthService } from './auth.service';
import { Public, getCurrentUser, getCurrentUserId } from './decorators';
import {
  RequestPasswordDto,
  ResetPasswordDto,
  SigninDto,
  SignupDto,
} from './dto';
import { RtGuard } from './guards';
import { Tokens } from './types';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  signup(@Body() dto: SignupDto): Promise<Tokens> {
    return this.authService.signup(dto);
  }

  @Public()
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signin(@Body() dto: SigninDto): Promise<Tokens> {
    return this.authService.signin(dto);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @getCurrentUserId() userId: number,
    @getCurrentUser('refreshToken') refreshToken: string,
  ) {
    return this.authService.refreshTokens(userId, refreshToken);
  }

  @Get('current-user')
  @HttpCode(HttpStatus.OK)
  async currentUser(@getCurrentUser() user: User) {
    const { id, username, email } = await this.usersService.findOne(
      user['sub'],
    );
    return { id, username, email };
  }

  @Post('signout')
  @HttpCode(HttpStatus.OK)
  logout(@getCurrentUserId() userId: number) {
    return this.authService.signout(userId);
  }

  @Public()
  @Post('request-password')
  @HttpCode(HttpStatus.OK)
  requestResetPassword(@Body() dto: RequestPasswordDto): Promise<any> {
    return this.authService.requestResetPassword(dto);
  }

  @Public()
  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  verifyResetToken(@Body() dto: ResetPasswordDto): Promise<any> {
    return this.authService.resetPassword(dto);
  }
}
