import { IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({ description: 'Tiêu đề bài viết' })
  @IsString()
  @MaxLength(255)
  title: string;

  @ApiProperty({ description: 'ID danh mục' })
  @IsString()
  category_id: string;

  @ApiProperty({ description: 'Nội dung bài viết' })
  @IsString()
  content: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Ảnh bài viết (upload file)',
    required: false,
  })
  @IsOptional()
  image?: any;

  @ApiProperty({ description: 'Slug của bài viết', required: true })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiProperty({ description: 'Mô tả ngắn về bài viết', required: true })
  @IsOptional()
  @IsString()
  short_description?: string;
}
