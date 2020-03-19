import { Module } from '@nestjs/common';
import { WebchatController } from './webchat.controller';
import { WebchatService } from './webchat.service';
@Module({
  imports: [],
  providers: [WebchatService],
  controllers: [WebchatController],
})
export class WebchatModule {}
