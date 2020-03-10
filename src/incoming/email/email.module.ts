import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
@Module({
  imports: [],
  providers: [EmailService],
  controllers: [EmailController],
})
export class EmailModule {}
