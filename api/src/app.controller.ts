import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AppService } from '@/app.service';
import { AtGuard } from '@/auth/guards';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(AtGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
