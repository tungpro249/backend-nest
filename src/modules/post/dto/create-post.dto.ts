import { IsString, MaxLength } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @MaxLength(255)
  title: string;
  @IsString()
  content: string;
  thumbnail_url: string;
  slug?: string;
}
