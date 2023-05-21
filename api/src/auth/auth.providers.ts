import { DataSource } from 'typeorm';
import { PasswordResetToken } from './entities/password_reset_token.entity';

export const authProviders = [
  {
    provide: 'PASSWORD_RESET_TOKEN_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(PasswordResetToken),
    inject: ['DATA_SOURCE'],
  },
];
