import { NestFactory } from '@nestjs/core';
import { ConsoleLogger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import helmet from 'helmet';

// import { ResponseInterceptor } from './global/interceptors/response.interceptor';
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger('Bootstrap', {
      logLevels: ['log', 'error', 'warn', 'debug'],
      timestamp: true,
    }),
  });
  app.use(helmet());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Loại bỏ các field không được khai báo trong DTO
      forbidNonWhitelisted: true, // Ném lỗi nếu có field lạ
      transform: true, // Tự động biến đổi dữ liệu về đúng kiểu
    }),
  );
  // app.useGlobalInterceptors(new ResponseInterceptor());
  app.enableCors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
    credentials: true,
  });


  const config = new DocumentBuilder()
    .setTitle('Swagger Document API')
    .setDescription('')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  app.setGlobalPrefix('/api/v1', { exclude: ['/'] });
  await app.listen(process.env.PORT ?? 5000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
