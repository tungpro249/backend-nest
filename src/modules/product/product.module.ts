import { Module } from '@nestjs/common';
import { productController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  controllers: [productController],
  providers: [ProductService],
})

export class ProductModule {}