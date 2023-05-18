import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { Tokens } from './types';
import { Public, getCurrentUser, getCurrentUserId } from './decorators';
import { SigninDto } from './dto';
import { RtGuard } from './guards';
import { User } from 'src/users/entities/user.entity';
import { RequestPasswordDto } from './dto/request-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
  currentUser(@getCurrentUser() user: User) {
    return user;
  }

  @Post('signout')
  @HttpCode(HttpStatus.OK)
  logout(@getCurrentUserId() userId: number) {
    return this.authService.signout(userId);
  }

  @Public()
  @Post('request-password')
  @HttpCode(HttpStatus.CREATED)
  requestPassword(@Body() dto: RequestPasswordDto): Promise<any> {
    return this.authService.requestPassword(dto);
  }
}
