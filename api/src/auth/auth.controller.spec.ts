import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { authProviders } from './auth.providers';
import { DatabaseModule } from '@/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AccessTokenStrategy, RefreshTokenStrategy } from './strategies';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from '@/mail/mail.module';
import { UsersModule } from '@/users/users.module';
import { databaseProviders } from '@/database/database.providers';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        JwtModule.register({}),
        MailModule,
        UsersModule,
      ],

      controllers: [AuthController],
      providers: [
        ...databaseProviders,
        ...authProviders,
        AuthService,
        AccessTokenStrategy,
        RefreshTokenStrategy,
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
