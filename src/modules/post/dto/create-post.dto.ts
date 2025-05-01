import { IsString, MaxLength } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @MaxLength(255)
  title: string;
  @IsString()
  content: string;
  @IsString()
  thumbnail_url: string;
}
