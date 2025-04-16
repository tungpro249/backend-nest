import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ResponseData } from 'src/global/globalClass';
import { httpMessage } from 'src/global/httpStatusEnum';
import { Product } from 'src/models/product.model';
import { ProductDto } from 'src/dto/product.dto';

@Controller('products')
export class productController {
  constructor(private catsService: ProductService) {}

  @Get()
  getProducts(): ResponseData<Product[]> {
    try {
      return new ResponseData<Product[]>(
        this.catsService.getProducts(),
        HttpStatus.OK,
        httpMessage.OK,
      );
    } catch (error) {
      return new ResponseData<Product[]>(
        error.message,
        HttpStatus.BAD_REQUEST,
        httpMessage.BAD_REQUEST,
      );
    }
  }

  @Get(':id')
  getDetailProduct(@Param('id') id: number): ResponseData<Product> {
    try {
      return new ResponseData<Product>(
        this.catsService.getDetailProduct(id),
        HttpStatus.OK,
        httpMessage.OK,
      );
    } catch (error) {
      return new ResponseData<Product>(
        error.message,
        HttpStatus.BAD_REQUEST,
        httpMessage.BAD_REQUEST,
      );
    }
  }

  @Post()
  createProduct(@Body() productDto: ProductDto): ResponseData<ProductDto> {
    try {
      return new ResponseData<ProductDto>(
        productDto,
        HttpStatus.OK,
        httpMessage.OK,
      );
    } catch (error) {
      return new ResponseData<ProductDto>(
        error.message,
        HttpStatus.BAD_REQUEST,
        httpMessage.BAD_REQUEST,
      );
    }
  }

  @Put()
  updateProduct(): ResponseData<string> {
    try {
      return new ResponseData<string>(
        this.catsService.updateProduct(),
        HttpStatus.OK,
        httpMessage.OK,
      );
    } catch (error) {
      return new ResponseData<string>(
        error.message,
        HttpStatus.BAD_REQUEST,
        httpMessage.BAD_REQUEST,
      );
    }
  }

  @Delete()
  deleteProduct(): ResponseData<string> {
    try {
      return new ResponseData<string>(
        this.catsService.deleteProduct(),
        HttpStatus.OK,
        httpMessage.OK,
      );
    } catch (error) {
      return new ResponseData<string>(
        error.message,
        HttpStatus.BAD_REQUEST,
        httpMessage.BAD_REQUEST,
      );
    }
  }
}
