import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../user/user.services';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { Users } from '../user/entities/user.entities';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(
    email: string,
    password: string,
  ): Promise<{ access_token: string; user: Users }> {
    const user = await this.usersService.findOne(email);
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!user || !isPasswordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: user.id, username: user.username, roles: user.role };
    const token = await this.jwtService.signAsync(payload);
    delete user.password;
    return { access_token: token, user: user };
  }

  async register(body: RegisterDto) {
    const payload = {
      username: body.username,
      email: body.email,
      password: body.password,
    };
    return this.usersService.create(payload);
  }
}
