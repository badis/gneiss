import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { databaseProviders } from '@/database/database.providers';
import { UsersService } from '@/users/users.service';

import { userProviders } from './user.providers';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
      ],
      providers: [...databaseProviders, ...userProviders, UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
