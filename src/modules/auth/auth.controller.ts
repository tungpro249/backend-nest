import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  @Post('login')
  login(@Body() body: any) {
    return body;
  }
  @Post('register')
  register(@Body() body: any) {
    return body;
  }
}
