import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  @ApiOperation({ summary: 'Danh sách bài viết' })
  @ApiResponse({
    status: 200,
    description: 'Lấy danh sách bài viết thành công',
  })
  async getPost(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
    @Query('key_search') key_search?: string,
    @Query('category_id') category_id?: number,
  ) {
    return this.postService.getPost(+page, +pageSize, key_search, category_id);
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Chi tiết bài viết' })
  @ApiResponse({
    status: 200,
    description: 'Lấy chi tiết bài viết thành công',
  })
  getPostBySlug(@Param('slug') slug: string) {
    return this.postService.getPostBySlug(slug);
  }

  // Lấy danh sách bài viết liên quan
  @Get(':slug/related')
  @ApiOperation({ summary: 'Danh sách bài viết liên quan' })
  @ApiResponse({
    status: 200,
    description: 'Lấy danh sách bài viết liên quan',
  })
  async getRelatedPosts(@Param('slug') slug: string) {
    const post = await this.postService.findBySlug(slug);

    if (!post) throw new NotFoundException();

    return this.postService.findRelatedPosts(post.category_id, slug);
  }

  @Post()
  @ApiOperation({ summary: 'Thêm bài viết bài viết' })
  @ApiConsumes('multipart/form-data') // ⚠️ Quan trọng: để Swagger hiện đúng form
  @ApiBody({
    description: 'Dữ liệu cần để tạo bài viết',
    type: CreatePostDto,
  })
  @UseInterceptors(FileInterceptor('image'))
  async createPost(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreatePostDto,
  ) {
    return this.postService.createPost(body, file);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Cập nhật bài viết bài viết' })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật bài viết thành công',
  })
  updatePost(@Param('id') id: string, @Body() data: UpdatePostDto) {
    return this.postService.updatePost(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa bài viết bài viết' })
  @ApiResponse({
    status: 200,
    description: 'Xóa bài viết thành công',
  })
  deletePost(@Param('id') id: string) {
    return this.postService.deletePost(id);
  }

  @Get('category/:category_id')
  @ApiOperation({ summary: 'Danh sách bài viết theo danh sách' })
  @ApiResponse({
    status: 200,
    description: 'Lấy danh sách bài viết theo danh sách',
  })
  getPostFromCategory(@Param('category_id') category_id: string) {
    return this.postService.getPostFromCategory(category_id, 1, 10);
  }
}
