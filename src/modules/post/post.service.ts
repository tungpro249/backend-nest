import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entities';
import { FindOptionsWhere, ILike, Not, Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { titleToSlug } from 'src/common/titleToSlug';
import { UpdatePostDto } from './dto/update-post.dto';
import { paginateResponse } from 'src/common/util/paginate.util';
import { CloudinaryService } from '../cloudinary/cloundinary.service';
import { Category } from '../category/entities/category.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
    private readonly postRepo: Repository<Post>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async getPost(
    page?: number,
    pageSize?: number,
    key_search?: string,
    category_id?: number,
  ) {
    const currentPage = page && page > 0 ? page : 1;
    const perPage = pageSize && pageSize > 0 ? pageSize : 10;

    if (category_id) {
      const categoryExists = await this.categoryRepo.findOneBy({
        id: +category_id,
      });
      if (!categoryExists) {
        throw new NotFoundException('Không tìm thấy danh mục');
      }
    }

    const whereClause: FindOptionsWhere<Post> = {
      ...(key_search ? { title: ILike(`%${key_search}%`) } : {}),
      ...(category_id ? { category_id: +category_id } : {}),
    };

    const [data, totalItems] = await this.postRepo.findAndCount({
      skip: (currentPage - 1) * perPage,
      take: perPage,
      where: whereClause,
      order: { created_at: 'DESC' },
    });

    if (data.length === 0) {
      return paginateResponse([], totalItems, currentPage, perPage);
    }

    return paginateResponse(data, totalItems, currentPage, perPage);
  }

  async getPostBySlug(slug: string) {
    const post = await this.postRepo.findOne({ where: { slug: slug } });
    return { data: post, message: 'Thành công', code: 200 };
  }

  async findBySlug(slug: string) {
    const post = await this.postRepo.findOne({ where: { slug: slug } });
    return post;
  }

  async findRelatedPosts(categoryId: number, slug: string) {
    const post = await this.postRepo.findOne({ where: { slug: slug } });
    const posts = await this.postRepo.find({
      where: { category_id: categoryId, id: Not(post.id) },
      order: { created_at: 'DESC' },
    });
    return { data: posts, message: 'Thành công', code: 200 };
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
    const categoryExists = await this.postRepo.findOneBy({ id: +category });
    if (!categoryExists) {
      throw new NotFoundException('Không tìm thấy danh mục');
    }

    const [data, totalItems] = await this.postRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      where: { category_id: +category },
    });
    return paginateResponse(data, totalItems, page, limit);
  }
}
