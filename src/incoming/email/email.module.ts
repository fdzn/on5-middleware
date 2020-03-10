import { Module, HttpModule } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
@Module({
  imports: [HttpModule],
  providers: [EmailService],
  controllers: [EmailController],
})
export class EmailModule {}
