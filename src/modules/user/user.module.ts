import { Module } from '@nestjs/common';
import { UsersService } from './user.services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entities';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UsersService],
  controllers: [UserController],
  providers: [UsersService],
})
export class UsersModule {}
