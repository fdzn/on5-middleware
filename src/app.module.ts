import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { IncomingModule } from "./incoming/incoming.module";
@Module({
  imports: [ConfigModule.forRoot(), IncomingModule],
  controllers: [AppController],
})
export class AppModule {}
