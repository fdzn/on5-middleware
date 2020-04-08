import { Module } from '@nestjs/common';
import { FacebookController } from './facebook.controller';
import { FacebookService } from './facebook.service';
@Module({
  providers: [FacebookService],
  controllers: [FacebookController],
})
export class FacebookModule {}
