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

  async getPost(page: number = 1, limit: number = 10) {
    const [data, totalItems] = await this.postRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data,
      pagination: {
        currentPage: page,
        perPage: limit,
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
      },
      message: 'thanh cong ',
      code: 200,
    };
  }

  async getPostById(id: string) {
    return this.postRepo.findOne({ where: { id: +id } });
  }

  async createPost(data: CreatePostDto) {
    const { title } = data;
    const slug = titleToSlug(title);
    const postToCreate = this.postRepo.create({
      ...data,
      slug,
    });
    const savedPost = await this.postRepo.save(postToCreate);
    return {
      data: savedPost,
      message: 'Thanh cong',
      code: 200,
    };
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
