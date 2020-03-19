import { Module } from '@nestjs/common';

import { TelegramModule } from './telegram/telegram.module';
import { EmailModule } from './email/email.module';
import { WebchatModule } from "./webchat/webchat.module";

@Module({
  imports: [TelegramModule, EmailModule, WebchatModule],
})
export class IncomingModule {}
