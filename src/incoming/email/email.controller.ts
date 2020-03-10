import { Controller, Post, Res, Body } from '@nestjs/common';
import { Response } from 'express';
import { EmailService } from './email.service';
// import { WebhookPost } from './dto/telegram-webhook.dto';
@Controller('incoming/email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post()
  async general(@Body() dataPost: any, @Res() res: Response) {
    const result = await this.emailService.webhook(dataPost);
    res.status(result.statusCode).send(result);
  }
}
