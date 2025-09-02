import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { Posts } from './entities/post.entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [TypeOrmModule.forFeature([Posts]), CloudinaryModule, CategoryModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
