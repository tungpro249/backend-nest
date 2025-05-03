import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entities';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { titleToSlug } from 'src/common/titleToSlug';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepo: Repository<Post>,
  ) {}

  async getPost() {
    return this.postRepo.findAndCount();
  }

  async getPostById(id: string) {
    return this.postRepo.findOne({ where: { id: +id } });
  }

  async createPost(data: CreatePostDto) {
    const { title } = data;
    const slug = titleToSlug(title);
    data = { ...data, slug };
    return this.postRepo.save(data);
  }

  async updatePost(id: string, data: UpdatePostDto) {
    await this.postRepo.update(id, data);
    return this.postRepo.findAndCount();
  }

  async deletePost(id: string) {
    await this.postRepo.delete(id);
    return this.postRepo.findAndCount();
  }
}
