import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}
  getAllCategories() {
    return 'getAllCategories';
  }
  createCategory(data: any): any {
    return 'createCategory';
  }
  updateCategory() {
    return 'updateCategory';
  }
  deleteCategory() {
    return 'deleteCategory';
  }
}
