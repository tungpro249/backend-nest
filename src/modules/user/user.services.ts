import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { Users } from './entities/user.entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/CreateUser.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(
    @InjectRepository(Users)
    private readonly userRepo: Repository<Users>,
  ) {}

  async findOne(email: string): Promise<Users | undefined> {
    this.logger.log(`Find user by email: ${email}`);
    this.logger.error(`User already exists: ${email}`);
    return await this.userRepo.findOne({ where: { email } });
  }

  async create(
    data: CreateUserDto,
  ): Promise<{ data: Users; message: string; code: number }> {
    const existingUser = await this.findOne(data.email);
    if (existingUser) {
      this.logger.error('Error message');
      throw new ConflictException('Người dùng đã tồn tại trong hệ thống');
    }

    // Create and save the new user
    const userToCreate = this.userRepo.create({
      ...data,
      password: await bcrypt.hash(data.password, 10),
    });
    const savedUser = await this.userRepo.save(userToCreate);

    return {
      data: savedUser,
      message: 'Thành công',
      code: 200,
    };
  }
}
