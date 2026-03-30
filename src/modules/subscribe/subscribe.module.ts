import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscriber } from './entities/subscriber.entity';
import { SubscribersService } from './subscribe.service';
import { EmailModule } from '../email/email.module';
import { SubscribersController } from './subscribe.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Subscriber]), EmailModule],
  controllers: [SubscribersController],
  providers: [SubscribersService],
  exports: [SubscribersService],
})
export class SubscribeModule {}
