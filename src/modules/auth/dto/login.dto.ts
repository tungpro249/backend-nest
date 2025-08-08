import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Email của người dùng',
    example: 'user@example.com',
  })
  @IsString()
  email: string;

  @ApiProperty({
    description: 'Mật khẩu của người dùng',
    example: 'yourPassword123!',
  })
  @MaxLength(50)
  @MinLength(6)
  password: string;
}
