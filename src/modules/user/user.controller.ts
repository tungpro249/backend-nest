import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.services';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/users')
  getHello(): string {
    return this.userService.getHello();
  }
}
