import { Module } from '@nestjs/common';

import { TelegramModule } from './telegram/telegram.module';
import { EmailModule } from './email/email.module';
import { WebchatModule } from './webchat/webchat.module';
import { FacebookModule } from './facebook/facebook.module';
import { InstagramModule } from './instagram/instagram.module';
import { TwitterModule } from './twitter/twitter.module';

@Module({
  imports: [
    TelegramModule,
    EmailModule,
    WebchatModule,
    FacebookModule,
    InstagramModule,
    TwitterModule,
  ],
})
export class IncomingModule {}
