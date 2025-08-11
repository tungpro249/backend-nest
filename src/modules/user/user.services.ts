import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entities';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  findOne(username: string): User | undefined {
    return this.users.find(user => user.username === username);
  }

  create(user: User): User {
    this.users.push(user);
    return user;
  }
}
