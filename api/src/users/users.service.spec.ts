import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { databaseProviders } from '@/database/database.providers';
import { UsersService } from '@/users/users.service';
import { User } from './entities';

describe('UsersService', () => {
  let service: UsersService;

  const userMock = {
    username: 'username',
    password: 'password',
    email: 'email@email.com',
  } as unknown as User;

  const mockUserRepository = {
    create: jest.fn().mockImplementation(dto => dto),
    save: jest.fn().mockImplementation(user => {
      const { password: _, ...rest } = user;
      return Promise.resolve({ id: Date.now(), ...rest });
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
      ],
      providers: [
        ...databaseProviders,
        {
          provide: 'USER_REPOSITORY',
          useValue: mockUserRepository,
        },
        UsersService,
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const user = await service.create(userMock);
    expect(user).toEqual({
      id: expect.any(Number),
      email: userMock.email,
      username: userMock.username,
    });
  });
});
