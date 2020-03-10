import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

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
  SwaggerModule.setup('api/application', app, document);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(parseInt(process.env.APP_PORT), '0.0.0.0');
}
bootstrap();
