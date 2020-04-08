import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as swStats from 'swagger-stats';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('ON5 Middleware')
    .setDescription('This is api documentation for ON5 Middleware')
    .setVersion('1.0')
    .addTag('ON5-middleware')
    .setContact(
      'Akhmad Faudzan Bakri',
      'https://github.com/fdzn',
      'faudzanbakri@gmail.com',
    )
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('documentation', app, document);
  app.useGlobalPipes(new ValidationPipe());
  app.use(swStats.getMiddleware());
  await app.listen(parseInt(process.env.APP_PORT), '0.0.0.0');
}
bootstrap();
