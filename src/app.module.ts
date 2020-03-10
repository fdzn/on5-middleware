import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { IncomingModule } from "./incoming/incoming.module";
@Module({
  imports: [ConfigModule.forRoot(), IncomingModule],
})
export class AppModule {}
