import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ProductModule } from './modules/product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './modules/product/entities/product.entity';
import { CategoryModule } from './modules/category/category.module';
import { Category } from './modules/category/entities/category.entity';
import { PostModule } from './modules/post/post.module';
import { Post } from './modules/post/entities/post.entities';
@Module({
  imports: [
    ProductModule,
    UserModule,
    CategoryModule,
    PostModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'tungpro249',
      database: 'nestjs',
      entities: [Product, Category, Post],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
