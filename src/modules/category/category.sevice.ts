import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { paginateResponse } from 'src/common/util/paginate.util';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  async getAllCategories(page: number = 1, limit: number = 10) {
    const [data, totalItems] = await this.categoryRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });

    return paginateResponse(data, totalItems, page, limit);
  }

  async getAllCategoriesOptions() {
    const [data, totalItems] = await this.categoryRepo.find({
      select: ['id', 'name'],
    });
    return { data, totalItems };
  }

  async createCategory(data: CreateCategoryDto) {
    const postToCreate = this.categoryRepo.create({
      ...data,
    });
    const savedCategory = await this.categoryRepo.save(postToCreate);
    return {
      data: savedCategory,
      message: 'Thành công',
      code: 200,
    };
  }

  async updateCategory(id: number, data: UpdateCategoryDto) {
    // Check if category exists
    const category = await this.categoryRepo.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException('Không tìm thấy danh mục');
    }

    // Update category with new data
    const updatedCategory = await this.categoryRepo.save({
      ...category,
      ...data,
    });

    return {
      data: updatedCategory,
      message: 'Cập nhật danh mục thành công',
      code: 200,
    };
  }

  async deleteCategory(id: number) {
    // Check if category exists
    const category = await this.categoryRepo.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException('Không tìm thấy danh mục');
    }

    // Soft delete or hard delete based on your entity configuration
    await this.categoryRepo.delete(id);

    return {
      data: null,
      message: 'Xóa danh mục thành công',
      code: 200,
    };
  }
}
