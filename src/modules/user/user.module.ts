import { Module } from '@nestjs/common';
import { UsersService } from './user.services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/user.entities';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  exports: [UsersService],
  controllers: [UserController],
  providers: [UsersService],
})
export class UsersModule {}
