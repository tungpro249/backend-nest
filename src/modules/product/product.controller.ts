import { ProductDto } from './dto/create-product.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productSevice: ProductService) {}

  @Get()
  async getAllProducts(): Promise<Product[]> {
    return this.productSevice.getAllProducts();
  }

  @Post()
  createProduct(@Body() productDto: ProductDto): Promise<Product> {
    return this.productSevice.createProduct(productDto);
  }

  @Get('/:id')
  async getProductById(@Param('id') id: number): Promise<Product> {
    return this.productSevice.getProductById(id);
  }

  @Put('/:id')
  async updateProduct(
    @Param('id') id: string,
    @Body() updateData: ProductDto,
  ): Promise<Product> {
    return this.productSevice.updateProduct(+id, updateData); // ép kiểu id về number
  }

  @Delete('/:id')
  async deleteProduct(@Param('id') id: string): Promise<Product> {
    return this.productSevice.deleteProduct(+id);
  }
}
