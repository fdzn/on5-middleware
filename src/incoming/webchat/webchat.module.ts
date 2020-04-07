import { Module, HttpModule } from '@nestjs/common';
import { WebchatController } from './webchat.controller';
import { WebchatService } from './webchat.service';
@Module({
  imports: [HttpModule],
  providers: [WebchatService],
  controllers: [WebchatController],
})
export class WebchatModule {}
