import { Module } from '@nestjs/common';
import { UsersService } from './user.services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entities';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UsersService],
  controllers: [],
  providers: [UsersService],
})
export class UsersModule {}
