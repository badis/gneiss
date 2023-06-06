import { DataSource } from 'typeorm';
import { Profile } from './entities';

export const profileProviders = [
  {
    provide: 'PROFILE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Profile),
    inject: ['DATA_SOURCE'],
  },
];
