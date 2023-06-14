import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { FilesModule } from '@/files/files.module';
import { ConfigModule } from '@nestjs/config';

describe('FilesController (e2e)', () => {
  let app: INestApplication;

  const mockFileRepository = {
    findOneBy: jest.fn().mockImplementation(({ guid }) => {
      return {
        guid,
        key: 'profile/picture/4c1fc649-0fc7-468f-8d85-58c93c50f40f.webp',
      };
    }),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        FilesModule,
      ],
    })
      .overrideProvider('FILE_REPOSITORY')
      .useValue(mockFileRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await Promise.all([app.close()]);
  });

  it('get profile picture', async () => {
    await request(app.getHttpServer())
      .get('/files/profile/picture/4c1fc649-0fc7-468f-8d85-58c93c50f40f')
      .accept('*/*')
      .expect(200);
  });
});
