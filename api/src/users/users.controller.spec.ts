import { Test, TestingModule } from '@nestjs/testing';

import { UsersController } from '@/users/users.controller';
import { UsersService } from '@/users/users.service';
import { userProviders } from './user.providers';
import { DatabaseModule } from '@/database/database.module';
import { ConfigModule } from '@nestjs/config';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        ConfigModule.forRoot({
          isGlobal: true,
        }),
      ],
      controllers: [UsersController],
      providers: [...userProviders, UsersService],
      exports: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
