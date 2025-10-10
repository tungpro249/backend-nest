import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { Posts } from './entities/post.entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { CategoryModule } from '../category/category.module';
import { SubscribeModule } from '../subscribe/subscribe.module';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Posts]),
    CloudinaryModule,
    CategoryModule,
    SubscribeModule,
    EmailModule,
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
