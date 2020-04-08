import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { IncomingModule } from './incoming/incoming.module';
import { MinioNestModule } from './minio/minio.module';
@Module({
  imports: [ConfigModule.forRoot(), IncomingModule, MinioNestModule],
  controllers: [AppController],
})
export class AppModule {}
