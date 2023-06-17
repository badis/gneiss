import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Authentication', () => {
  let app: INestApplication;
  let jwtToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await Promise.all([app.close()]);
  });

  // assume test data includes user test@example.com with password 'password'
  it('authenticates user with valid credentials and provides a jwt token', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/signin')
      .send({ username: 'badis', password: 'badismerabet' })
      .expect(200);

    // set jwt token for use in subsequent tests
    jwtToken = response.body.accessToken;
    expect(jwtToken).toMatch(
      /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/,
    ); // jwt regex
  });

  it('fails to authenticate user with an incorrect password', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/signin')
      .send({ username: 'badis', password: '1234' })
      .expect(403);

    expect(response.body.accessToken).not.toBeDefined();
  });

  // assume test data does not include a nobody@example.com user
  it('fails to authenticate user that does not exist', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/signin')
      .send({ username: 'nobody', password: '1234' })
      .expect(403);

    expect(response.body.accessToken).not.toBeDefined();
  });

  it('gets protected resource with jwt authenticated request', async () => {
    const response = await request(app.getHttpServer())
      .get('/profile')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);

    expect(Object.keys(response.body).length).toBe(6);
  });
});
