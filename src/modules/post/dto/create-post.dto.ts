import { IsNumber, IsString, MaxLength } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @MaxLength(255)
  title: string;
  @IsNumber()
  category_id: number;
  @IsString()
  content: string;
  thumbnail_url?: string;
  slug?: string;
  @IsString()
  short_description?: string;
}
