import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/database/database.module';

import { ProfilesService } from './profiles.service';
import { profileProviders } from './profile.providers';

@Module({
  imports: [DatabaseModule],
  providers: [...profileProviders, ProfilesService],
  exports: [ProfilesService],
})
export class ProfilesModule {}
