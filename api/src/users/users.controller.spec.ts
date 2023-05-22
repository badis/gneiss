import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { databaseProviders } from '@/database/database.providers';
import { UsersController } from '@/users/users.controller';
import { UsersService } from '@/users/users.service';

import { userProviders } from './user.providers';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
      ],
      controllers: [UsersController],
      providers: [...databaseProviders, ...userProviders, UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
