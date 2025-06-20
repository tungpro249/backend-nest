import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entities';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { titleToSlug } from 'src/common/titleToSlug';
import { UpdatePostDto } from './dto/update-post.dto';
import { paginateResponse } from 'src/common/util/paginate.util';
import { CloudinaryService } from '../cloudinary/cloundinary.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepo: Repository<Post>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async getPost(page: number = 1, limit: number = 10) {
    const [data, totalItems] = await this.postRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });

    return paginateResponse(data, totalItems, page, limit);
  }

  async getPostBySlug(slug: string) {
    const post = await this.postRepo.findOne({ where: { slug: slug } });
    return { data: post, message: 'Thành công', code: 200 };
  }

  async createPost(data: CreatePostDto, file?: Express.Multer.File) {
    const { title } = data;
    const slug = titleToSlug(title);

    let imageUrl = null;
    if (file) {
      const uploadResult = await this.cloudinaryService.uploadImage(file);
      imageUrl = uploadResult.secure_url;
    }
    const postToCreate = this.postRepo.create({
      ...data,
      slug,
      category_id: Number(data.category_id),
      thumbnail_url: imageUrl,
    });
    const savedPost = await this.postRepo.save(postToCreate);
    return {
      data: savedPost,
      message: 'Thành công',
      code: 200,
    };
  }

  async updatePost(id: string, data: UpdatePostDto) {
    const post = await this.postRepo.findOneBy({ id: +id });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const updated = this.postRepo.merge(post, {
      ...data,
      category_id: data.category_id ? +data.category_id : undefined,
    });
    return await this.postRepo.save(updated);
  }

  async deletePost(id: string) {
    await this.postRepo.delete(id);
    return this.postRepo.findAndCount();
  }

  async getPostFromCategory(
    category: string,
    page: number = 1,
    limit: number = 10,
  ) {
    console.log('fucking', category);
    const [data, totalItems] = await this.postRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      where: { category_id: +category },
    });

    return paginateResponse(data, totalItems, page, limit);
  }
}
