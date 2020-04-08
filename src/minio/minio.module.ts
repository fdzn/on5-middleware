import { Module, HttpModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MinioModule } from 'nestjs-minio-client';
import { MinioController } from './minio.controller';
import { MinioNestService } from './minio.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MinioModule.register({
      endPoint: process.env.MINIO_ENDPOINT,
      port: parseInt(process.env.MINIO_PORT),
      useSSL: true,
      accessKey: process.env.MINIO_ACCESS_KEY,
      secretKey: process.env.MINIO_SECRET_KEY,
    }),
    HttpModule,
  ],
  controllers: [MinioController],
  providers: [MinioNestService],
})
export class MinioNestModule {}
