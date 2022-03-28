import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Ecommerce')
    .setDescription('The ecommerce API')
    .setVersion('1.0.0')
    .addTag('Auth')
    .addTag('Users')
    .addTag('Category')
    .addTag('Products')
    .addTag('Orders')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })

    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.enableCors();
  await app.listen(8080);
}

bootstrap();
