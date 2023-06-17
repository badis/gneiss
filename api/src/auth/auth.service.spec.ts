import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import { databaseProviders } from '@/database/database.providers';
import { MailModule } from '@/mail/mail.module';
import { UsersModule } from '@/users/users.module';

import { authProviders } from './auth.providers';
import { AuthService } from './auth.service';
import { Tokens } from './types';

describe('AuthService', () => {
  let service: AuthService;

  const dto = {
    username: 'username',
    password: 'password',
    email: 'email@email.com',
  };

  const mockUsersService = {
    create: jest.fn(dto => {
      return {
        id: Date.now(),
        username: dto.username,
        email: dto.email,
      };
    }),
  };

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

  it('should be able to signup', async () => {
    const password = await service.generateHash(dto.password);
    const newUser = mockUsersService.create({
      ...dto,
      password,
    });

    const tokens: Tokens = await service.generateTokens(
      newUser.id,
      newUser.username,
      newUser.email,
    );

    expect(!!tokens.accessToken).toBe(true);
    expect(typeof tokens.accessToken).toBe('string');
    expect(!!tokens.refreshToken).toBe(true);
    expect(typeof tokens.refreshToken).toBe('string');
  });
});
