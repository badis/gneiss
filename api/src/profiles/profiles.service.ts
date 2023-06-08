import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { ProfileDto } from './dto/profile.dto';
import { Profile } from './entities';

@Injectable()
export class ProfilesService {
  constructor(
    @Inject('PROFILE_REPOSITORY')
    private profileRepository: Repository<Profile>,
  ) {}

  findOne(user_id: number) {
    return this.profileRepository.findOneBy({ user_id });
  }

  update(user_id: number, profileDto: Partial<ProfileDto>) {
    return this.profileRepository.update(user_id, profileDto);
  }
}
