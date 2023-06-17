import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AppService } from '@/app.service';
import { Public } from '@/auth/decorators';
import { AtGuard } from '@/auth/guards';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
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
