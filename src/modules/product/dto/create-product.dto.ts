import { IsNumber, IsString, Min } from 'class-validator';

export class ProductDto {
  @IsString()
  name: string;
  @IsNumber() @Min(0)
  price: number;
}
