import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import * as crypto from 'node:crypto';
import * as util from 'util';

import { pgErrorCodes } from 'src/database/database-error-codes';
import { MailService } from 'src/mail/mail.service';
import { UsersService } from 'src/users/users.service';

import {
  RequestPasswordDto,
  ResetPasswordDto,
  SigninDto,
  SignupDto,
} from './dto';
import { PasswordResetToken } from './entities';
import { Tokens } from './types';

const DAY = 24 * 60 * 60;
const MINUTE = 60;
const SALT_ROUNDS = 10;

@Injectable()
export class AuthService {
  constructor(
    @Inject('PASSWORD_RESET_TOKEN_REPOSITORY')
    private prtRepository: Repository<PasswordResetToken>,
    private config: ConfigService,
    private jwtService: JwtService,
    private mailService: MailService,
    private usersService: UsersService,
  ) {}

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

  // `Request new password` Route
  async requestResetPassword(dto: RequestPasswordDto): Promise<any> {
    try {
      const randomBytes = util.promisify(crypto.randomBytes);
      const resetToken = (await randomBytes(32)).toString('hex');
      const hashed_reset_token = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

      const user = await this.usersService.findOneByEmail(dto.email);
      if (!user) return new NotFoundException(['User not found']);

      const passwordResetToken: Partial<PasswordResetToken> = {
        user_id: user.id,
        hashed_reset_token,
      };
      await this.prtRepository.upsert(passwordResetToken, ['user_id']);

      const resetPasswordUrl = `${this.config.get(
        'FRONTEND_URL',
      )}/auth/reset-password?token=${resetToken}`;
      const subject = '[Gneiss] Reset password request';

      // Generate and send a magic link to reset password
      await this.mailService.sendEmail(
        user.email,
        subject,
        user.username,
        resetPasswordUrl,
        'reset-password',
      );

      return {
        response: {
          statusCode: 200,
          message: ['Reset password email sent successfully'],
          error: null,
        },
      };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async resetPassword(dto: ResetPasswordDto): Promise<any> {
    const { token, password } = dto;

    if (!token) {
      throw new BadRequestException(['Token is missing']);
    }

    const hashed_reset_token = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    try {
      const record = await this.prtRepository.findOneBy({ hashed_reset_token });
      if (!record) {
        return {
          response: {
            statusCode: 400,
            message: ['Invalid or expired password reset token'],
            error: null,
          },
        };
      }

      const hashed_password = await this.generateHash(password);
      await this.usersService.update(record.user_id, {
        password: hashed_password,
      });

      await this.prtRepository.delete({ hashed_reset_token });

      return {
        response: {
          statusCode: 200,
          message: ['Password reset successfully'],
          error: null,
        },
      };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(error);
    }
  }
}
