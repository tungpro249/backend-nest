import { ConflictException, Injectable } from '@nestjs/common';
import { User } from './entities/user.entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/CreateUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async findOne(email: string): Promise<User | undefined> {
    return await this.userRepo.findOne({ where: { email } });
  }

  async create(
    data: CreateUserDto,
  ): Promise<{ data: User; message: string; code: number }> {
    const existingUser = await this.findOne(data.email);
    if (existingUser) {
      throw new ConflictException('Người dùng đã tồn tại trong hệ thống');
    }

    // Create and save the new user
    const userToCreate = this.userRepo.create({
      ...data,
    });
    const savedUser = await this.userRepo.save(userToCreate);

    return {
      data: savedUser,
      message: 'Thành công',
      code: 200,
    };
  }
}
