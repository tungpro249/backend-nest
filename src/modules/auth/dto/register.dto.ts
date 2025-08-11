import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ description: 'Username', example: 'john' })
  @IsString()
  username: string;
  @ApiProperty({ description: 'Email', example: 'user@example.com' })
  @IsString()
  email: string;
  @ApiProperty({ description: 'Password', example: 'yourPassword123!' })
  @IsString()
  password: string;
}
