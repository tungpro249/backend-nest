import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
  getProducts() {
    return 'get products';
  }

  createProduct() {
    return 'create product';
  }

  updateProduct() {
    return 'update product';
  }

  deleteProduct() {
    return 'delete product';
  }
}