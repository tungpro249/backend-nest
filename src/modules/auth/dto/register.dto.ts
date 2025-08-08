import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ description: 'Username' })
  username: string;
  @ApiProperty({ description: 'Email' })
  email: string;
  @ApiProperty({ description: 'Password' })
  password: string;
}
