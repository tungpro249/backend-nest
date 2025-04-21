import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { CategoryService } from './category.sevice';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getAllCategories() {
    return this.categoryService.getAllCategories();
  }

  @Post()
  createCategory(@Body() data: CreateCategoryDto): Promise<Category> {
    return this.categoryService.createCategory(data);
  }

  @Put(':id')
  updateCategory() {
    return this.categoryService.updateCategory();
  }

  @Delete(':id')
  deleteCategory() {
    return this.categoryService.deleteCategory();
  }
}
