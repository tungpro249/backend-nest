import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../user/user.services';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { Users } from '../user/entities/user.entities';
import admin from 'src/firebase/firebase.config';

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
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: user.id, username: user.username, roles: user.role };
    const token = await this.jwtService.signAsync(payload);
    delete user.password;
    return { access_token: token, user: user };
  }

  async googleLogin(idToken: string) {
    try {
      // ✅ Xác thực token từ Firebase
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      const { uid, name, email, picture } = decodedToken;

      // 👉 Ở đây bạn có thể lưu thông tin user vào DB (nếu chưa có)
      // Ví dụ: tìm user theo email, nếu chưa có thì tạo mới.
      // Mình sẽ giả lập dữ liệu user:
      const user = {
        uid,
        name,
        email,
        picture,
      };

      // 👉 Tạo access token riêng của bạn (JWT app của bạn)
      // hoặc chỉ trả thông tin user cho FE nếu chỉ login Google thôi
      return {
        message: 'Google login success',
        user,
      };
    } catch (error) {
      console.error('Google token verification failed:', error);
      throw new UnauthorizedException('Invalid Google token');
    }
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
