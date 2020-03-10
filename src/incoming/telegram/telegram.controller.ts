import { Controller, Get, Post, Res, Body } from '@nestjs/common';
import { Response } from 'express';
import { TelegramService } from './telegram.service';
import { WebhookPost } from './dto/telegram-webhook.dto';
@Controller('incoming/telegram')
export class TelegramController {
  constructor(private readonly telegramService: TelegramService) {}

  @Post('webhook')
  async webhook(@Body() dataPost: WebhookPost, @Res() res: Response) {
    const result = await this.telegramService.webhook(dataPost);
    res.status(result.statusCode).send(result);
  }
}
