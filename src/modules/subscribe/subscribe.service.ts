// subscribers/subscribers.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscriber } from './entities/subscriber.entity';

@Injectable()
export class SubscribersService {
  constructor(
    @InjectRepository(Subscriber)
    private subscriberRepo: Repository<Subscriber>,
  ) {}

  async create(email: string) {
    const exist = await this.subscriberRepo.findOne({ where: { email } });
    if (exist) return { message: 'Email đã đăng ký rồi' };

    const subscriber = this.subscriberRepo.create({ email });
    await this.subscriberRepo.save(subscriber);
    return { message: 'Đăng ký nhận thông báo thành công' };
  }

  async findOne(email: string) {
    return this.subscriberRepo.findOne({ where: { email } });
  }

  async delete(email: string) {
    const subscriber = await this.subscriberRepo.findOne({ where: { email } });
    if (!subscriber) return { message: 'Không tìm thấy người dùng' };
    this.subscriberRepo.delete({ email });

    return { message: 'Xóa người dùng thành công' };
  }

  async findAll() {
    return this.subscriberRepo.find();
  }
}
