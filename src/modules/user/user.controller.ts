import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('user')
export class UserController {
  @UseGuards(AuthGuard)
  @Get('profile')
  getAll() {
    return 'profile';
  }
}
