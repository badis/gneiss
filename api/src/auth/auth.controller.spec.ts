import { ConfigModule } from '@nestjs/config';
import { HttpException } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import { databaseProviders } from '@/database/database.providers';
import { MailModule } from '@/mail/mail.module';
import { User } from '@/users/entities';
import { UsersModule } from '@/users/users.module';
import { UsersService } from '@/users/users.service';

import { AuthController } from './auth.controller';
import { authProviders } from './auth.providers';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;

  const userMock = {
    id: Date.now(),
    username: 'username',
    email: 'email@email.com',
  } as unknown as User;

  const mockUsersService = {
    findOne: jest.fn(() => {
      return userMock;
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

      controllers: [AuthController],
      providers: [...databaseProviders, ...authProviders, AuthService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Get current user', () => {
    it('should fetch current user (happy path)', async () => {
      try {
        const response = await controller.currentUser(userMock);
        expect(response).toEqual({
          id: expect.any(Number),
          ...userMock,
        });

        expect(mockUsersService.findOne).toHaveBeenCalled();
      } catch (e) {
        expect(e.getStatus()).toEqual(401);
      }
    });
  });
});
