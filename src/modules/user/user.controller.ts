import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Roles } from 'src/common/decorator/roles.decorator';
import { Role } from 'src/common/enums/role.enum';

@Controller('user')
export class UserController {
  @UseGuards(AuthGuard)
  // @Roles(Role.Admin)
  @Get('profile')
  getAll() {
    return 'profile';
  }
}
