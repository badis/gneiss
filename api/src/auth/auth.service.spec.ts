import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import { databaseProviders } from '@/database/database.providers';
import { MailModule } from '@/mail/mail.module';
import { UsersModule } from '@/users/users.module';

import { authProviders } from './auth.providers';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        JwtModule.register({}),
        MailModule,
        UsersModule,
      ],

      providers: [...databaseProviders, ...authProviders, AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
