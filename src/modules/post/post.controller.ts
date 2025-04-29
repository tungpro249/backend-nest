import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async getPost() {
    return this.postService.getPost();
  }

  @Get(':id')
  getPostById() {
    return 'post by id';
  }

  @Post()
  createPost() {
    return 'create post';
  }

  @Put()
  updatePost() {
    return 'update post';
  }

  @Delete()
  deletePost() {
    return 'delete post';
  }
}
