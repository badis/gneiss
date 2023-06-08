import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/database/database.module';
import { ProfilesModule } from '@/profiles/profiles.module';

import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { fileProviders } from './file.providers';

@Module({
  imports: [DatabaseModule, ProfilesModule],
  controllers: [FilesController],
  providers: [...fileProviders, FilesService],
})
export class FilesModule {}
