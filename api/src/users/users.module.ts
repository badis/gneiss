import { Module } from '@nestjs/common';

import { UsersService } from '@/users/users.service';
import { UsersController } from '@/users/users.controller';
import { userProviders } from '@/users/user.providers';
import { DatabaseModule } from '@/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [...userProviders, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
