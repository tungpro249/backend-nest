import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../user/user.services';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async login(
    username: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(username);
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.userId, username: user.username };
    const token = await this.jwtService.signAsync(payload);
    return {
      access_token: token,
    };
  }
}
