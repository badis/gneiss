import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AtGuard } from './auth/guards';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // config `RateLimiting`
    // ThrottlerModule.forRoot({
    //   ttl: parseInt(process.env.RATE_LIMIT_TIME_TO_LIVE),
    //   limit: parseInt(process.env.RATE_LIMIT_MAX_NUMBER_REQUEST),
    // }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // To set `ATGuard` as global guard for all routes
    { provide: APP_GUARD, useClass: AtGuard },
    // To enable `RateLimit` for all routes
    // {
    //   provide: APP_GUARD,
    //   useClass: ThrottlerGuard,
    // },
  ],
})
export class AppModule {}
