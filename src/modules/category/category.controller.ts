import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import { CategoryService } from './category.sevice';

@ApiTags('categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ApiOperation({ summary: 'Get all categories with pagination' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number (default: 1)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Items per page (default: 10)',
  })
  @ApiResponse({
    status: 200,
    description: 'List of categories with pagination metadata',
  })
  async getAllCategories(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.categoryService.getAllCategories(page, limit);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new category' })
  @ApiResponse({
    status: 200,
    description: 'Category created successfully',
    type: Category,
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async createCategory(@Body() data: CreateCategoryDto) {
    return this.categoryService.createCategory(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing category' })
  @ApiParam({
    name: 'id',
    required: true,
    type: Number,
    description: 'Category ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Category updated successfully',
    type: Category,
  })
  @ApiResponse({ status: 404, description: 'Category not found' })
  async updateCategory(
    @Param('id') id: number,
    @Body() data: UpdateCategoryDto,
  ) {
    return this.categoryService.updateCategory(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a category' })
  @ApiParam({
    name: 'id',
    required: true,
    type: Number,
    description: 'Category ID',
  })
  @ApiResponse({ status: 200, description: 'Category deleted successfully' })
  @ApiResponse({ status: 404, description: 'Category not found' })
  async deleteCategory(@Param('id') id: number) {
    return this.categoryService.deleteCategory(id);
  }
}
