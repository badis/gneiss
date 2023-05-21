import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccessTokenStrategy, RefreshTokenStrategy } from './strategies';
import { MailModule } from 'src/mail/mail.module';
import { authProviders } from './auth.providers';
import { DatabaseModule } from 'src/database/database.module';

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
