import { Module } from '@nestjs/common';

import { TelegramModule } from './telegram/telegram.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [TelegramModule, EmailModule],
})
export class IncomingModule {}
