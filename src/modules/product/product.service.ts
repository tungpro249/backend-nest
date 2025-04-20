import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async getAllProducts() {
    return this.productRepo.find();
  }

  async createProduct(data: ProductDto): Promise<Product> {
    const newProduct = this.productRepo.create(data);
    return this.productRepo.save(newProduct);
  }

  async getProductById(id: number): Promise<Product> {
    return this.productRepo.findOne({ where: { id } });
  }

  async updateProduct(id: number, data: ProductDto): Promise<Product> {
    const product = await this.productRepo.findOne({ where: { id } });
    if (!product) throw new NotFoundException('Product not found');
    await this.productRepo.update(id, data);
    return this.productRepo.findOne({ where: { id } });
  }

  async deleteProduct(id: number): Promise<Product> {
    const product = await this.productRepo.findOne({ where: { id } });
    if (!product) throw new NotFoundException('Product not found');
    await this.productRepo.delete(id);
    return product;
  }
}
