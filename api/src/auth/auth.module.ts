import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { DatabaseModule } from '@/database/database.module';
import { MailModule } from '@/mail/mail.module';
import { UsersModule } from '@/users/users.module';

import { AuthController } from './auth.controller';
import { authProviders } from './auth.providers';
import { AuthService } from './auth.service';
import { AccessTokenStrategy, RefreshTokenStrategy } from './strategies';

@Module({
  imports: [
    JwtModule.register({}),
    MailModule,
    PassportModule,
    UsersModule,
    DatabaseModule,
  ],
  controllers: [AuthController],
  providers: [
    ...authProviders,
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
})
export class AuthModule {}
