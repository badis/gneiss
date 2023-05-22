import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { User } from '@/users/entities';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  create(user: Partial<User>) {
    return this.userRepository.save(user);
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  findOneByUsername(username: string) {
    return this.userRepository.findOneBy({ username });
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  update(id: number, user: Partial<User>) {
    return this.userRepository.update(id, user);
  }
}
