import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.services';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('users')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/users')
  getHello(): string {
    return this.userService.getHello();
  }
}
