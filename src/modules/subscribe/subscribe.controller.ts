import { Controller, Post, Body, Get } from '@nestjs/common';
import { SubscribersService } from './subscribe.sevice';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Subscribers')
@Controller('subscribers')
export class SubscribersController {
  constructor(private subscribersService: SubscribersService) {}

  @Post()
  async create(@Body('email') email: string) {
    return this.subscribersService.create(email);
  }

  @Get()
  async findAll() {
    return this.subscribersService.findAll();
  }
}
