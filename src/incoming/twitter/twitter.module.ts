import { Module, HttpModule } from '@nestjs/common';
import { TwitterService } from './twitter.service';
import { TwitterController } from './twitter.controller';

@Module({
  imports: [HttpModule],
  providers: [TwitterService],
  controllers: [TwitterController],
})
export class TwitterModule {}
