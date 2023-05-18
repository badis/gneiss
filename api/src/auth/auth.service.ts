import {
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { SignupDto } from './dto/signup.dto';
import { Tokens } from './types';
import { SigninDto } from './dto';
import { pgErrorCodes } from 'src/database/database-error-codes';
import { RequestPasswordDto } from './dto/request-password.dto';
import { MailService } from 'src/mail/mail.service';

const DAY = 24 * 60 * 60;
const MINUTE = 60;
const SALT_ROUNDS = 10;

@Injectable()
export class AuthService {
  constructor(
    private config: ConfigService,
    private jwtService: JwtService,
    private mailService: MailService,
    private usersService: UsersService,
  ) {}

  // `Signup` Route
  async signup(dto: SignupDto): Promise<Tokens> {
    const password = await this.generateHash(dto.password);

    try {
      const newUser = await this.usersService.create({
        username: dto.username,
        password,
        email: dto.email,
      });

      const tokens: Tokens = await this.generateTokens(
        newUser.id,
        newUser.username,
        newUser.email,
      );

      await this.updateRefreshTokenHash(newUser.id, tokens.refreshToken);
      return tokens;
    } catch (error) {
      const errors = [];
      if (error.code == pgErrorCodes.DUPLICATE_ENTRY) {
        if (error.detail.includes('username')) {
          errors.push('Username already exists');
        }
        if (error.detail.includes('email')) {
          errors.push('Email already exists');
        }
      }
      if (errors.length > 0) {
        throw new ConflictException(errors);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  // `SignIn` Route
  async signin(dto: SigninDto): Promise<Tokens> {
    const user = await this.usersService.findOneByUsername(dto.username);

    if (!user) throw new ForbiddenException(['Access denied']);

    const passwordMatches = await bcrypt.compare(dto.password, user.password);
    if (!passwordMatches) throw new ForbiddenException(['Access denied']);

    const tokens: Tokens = await this.generateTokens(
      user.id,
      user.username,
      user.email,
    );
    await this.updateRefreshTokenHash(user.id, tokens.refreshToken);
    return tokens;
  }

  // `Signout` Route
  async signout(id: number) {
    try {
      await this.usersService.update(id, {
        hashed_refresh_token: null,
      });

      return { ok: true };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  // `Request new password` Route
  async requestPassword(dto: RequestPasswordDto): Promise<any> {
    // Generate and send a magic link to reset password

    const response = await this.mailService.sendEmail(
      dto.email,
      'Welcome s',
      'Hello world',
      'reset-password',
    );

    return response;
  }

  // `RefreshToken` Route
  async refreshTokens(id: number, refreshToken: string) {
    const user = await this.usersService.findOne(id);

    if (!user || !user.hashed_refresh_token)
      throw new ForbiddenException(['Access denied']);

    const refreshTokenMatches = await bcrypt.compare(
      refreshToken,
      user.hashed_refresh_token,
    );

    if (!refreshTokenMatches) throw new ForbiddenException(['Access denied']);

    const tokens: Tokens = await this.generateTokens(
      user.id,
      user.username,
      user.email,
    );
    await this.updateRefreshTokenHash(user.id, tokens.refreshToken);
    return tokens;
  }

  async generateHash(data: string): Promise<string> {
    return await bcrypt.hash(data, SALT_ROUNDS);
  }

  async updateRefreshTokenHash(
    id: number,
    refreshToken: string,
  ): Promise<void> {
    const hash = await this.generateHash(refreshToken);
    await this.usersService.update(id, { hashed_refresh_token: hash });
  }

  async generateTokens(
    id: number,
    username: string,
    email: string,
  ): Promise<Tokens> {
    const payload = {
      sub: id,
      username,
      email,
      'https://hasura.io/jwt/claims': {
        'x-hasura-allowed-roles': ['user'],
        'x-hasura-default-role': 'user',
        'x-hasura-role': 'user',
        'x-hasura-user-id': id,
      },
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.config.get('JWT_ACCESS_TOKEN_SECRET_KEY'),
        expiresIn: this.config.get('ACCESS_TOKEN_LIFE_TIME') * MINUTE,
      }),
      this.jwtService.signAsync(payload, {
        secret: this.config.get('JWT_REFRESH_TOKEN_SECRET_KEY'),
        expiresIn: this.config.get('REFRESH_TOKEN_LIFE_TIME') * DAY,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
