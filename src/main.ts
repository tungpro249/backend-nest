import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Loại bỏ các field không được khai báo trong DTO
      forbidNonWhitelisted: true, // Ném lỗi nếu có field lạ
      transform: true, // Tự động biến đổi dữ liệu về đúng kiểu
    }),
  );
  await app.listen(process.env.PORT ?? 3005);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
