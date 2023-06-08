import { DataSource } from 'typeorm';
import { TFile } from './entities';

export const fileProviders = [
  {
    provide: 'FILE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(TFile),
    inject: ['DATA_SOURCE'],
  },
];
