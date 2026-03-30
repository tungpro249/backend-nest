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
import { Categories } from './entities/category.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

@ApiTags('categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ApiOperation({ summary: 'Danh sách categories' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number (mặc định: 1)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Items per page (mặc định: 10)',
  })
  @ApiResponse({
    status: 200,
    description: 'Danh sách categories thành công',
  })
  async getAllCategories(@Query() query: PaginationQueryDto) {
    const { page, limit } = query;
    return this.categoryService.getAllCategories(page, limit);
  }

  @Get('/options')
  @ApiOperation({ summary: 'Danh sách options categories' })
  @ApiResponse({
    status: 200,
    description: 'Danh sách options categories',
  })
  async getAllCategoriesOptions() {
    return this.categoryService.getAllCategoriesOptions();
  }

  @Post()
  @ApiOperation({ summary: 'Thêm mô tả category' })
  @ApiResponse({
    status: 200,
    description: 'Thêm mô tả category thành công',
    type: Categories,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async createCategory(@Body() data: CreateCategoryDto) {
    return this.categoryService.createCategory(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Cập nhật category' })
  @ApiParam({
    name: 'id',
    required: true,
    type: Number,
    description: 'Category ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật category thành công',
    type: Categories,
  })
  @ApiResponse({ status: 404, description: 'Không tìm thấy category' })
  async updateCategory(
    @Param('id') id: number,
    @Body() data: UpdateCategoryDto,
  ) {
    return this.categoryService.updateCategory(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa category' })
  @ApiParam({
    name: 'id',
    required: true,
    type: Number,
    description: 'Category ID',
  })
  @ApiResponse({ status: 200, description: 'Xóa category thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy category' })
  async deleteCategory(@Param('id') id: number) {
    return this.categoryService.deleteCategory(id);
  }
}
