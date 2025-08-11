import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../user/user.services';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(
    username: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(username);
    if (!user || user.password !== password) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: user.id, username: user.username }; // ✅ dùng user.id
    const token = await this.jwtService.signAsync(payload);
    return { access_token: token };
  }

  async register(body: RegisterDto) {
    const payload = {
      username: body.username,
      email: body.email,
      password: body.password, // ❌ chưa hash, chỉ dùng test
    };
    return this.usersService.create(payload);
  }
}
