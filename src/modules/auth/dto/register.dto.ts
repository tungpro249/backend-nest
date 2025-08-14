import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ description: 'Username', example: 'john' })
  @IsString()
  @IsNotEmpty()
  username: string;
  @ApiProperty({ description: 'Email', example: 'user@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @ApiProperty({ description: 'Password', example: 'yourPassword123!' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
