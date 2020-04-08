import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { IncomingModule } from './incoming/incoming.module';
import { MinioModule } from './minio/minio.module';
@Module({
  imports: [ConfigModule.forRoot(), IncomingModule, MinioModule],
  controllers: [AppController],
})
export class AppModule {}
