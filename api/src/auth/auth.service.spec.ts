import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { authProviders } from './auth.providers';
import { DatabaseModule } from '@/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from '@/mail/mail.module';
import { UsersModule } from '@/users/users.module';
import { databaseProviders } from '@/database/database.providers';
import { AccessTokenStrategy, RefreshTokenStrategy } from './strategies';

describe('AuthService', () => {
  let service: AuthService;

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

      providers: [
        ...databaseProviders,
        ...authProviders,
        AuthService,
        AccessTokenStrategy,
        RefreshTokenStrategy,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
