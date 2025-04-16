
import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class productController {

  constructor(private catsService: ProductService) {}

  @Get()
  getProducts() {
    return this.catsService.getProducts();
  }

  @Post()
  createProduct() {
    return this.catsService.createProduct();
  }

  @Put()
  updateProduct() {
    return this.catsService.updateProduct();
  }

  @Delete()
  deleteProduct() {
    return this.catsService.deleteProduct();
  }
}
