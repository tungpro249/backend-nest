import { Injectable } from '@nestjs/common';
import { Product } from 'src/models/product.model';

@Injectable()
export class ProductService {

  private product: Product[] = [
    { id: 1, name: 'product 1', price: 100 },
    { id: 2, name: 'product 2', price: 200 },
    { id: 3, name: 'product 3', price: 300 }
  ];

  getProducts(): Product[] {
    return this.product;
  }

  getDetailProduct(id: number) {
    return this.product.find(item => item.id == id)
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