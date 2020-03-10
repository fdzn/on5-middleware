import { Controller, Get, Post, Res, Body } from '@nestjs/common';
import { Response } from 'express';
import { TelegramService } from './telegram.service';
@Controller('incoming/telegram')
export class TelegramController {
  constructor(private readonly telegramService: TelegramService) {}

  @Post('webhook')
  async webhook(@Body() dataPost: any, @Res() res: Response) {
    console.log('incoming telegram', dataPost);
    const result = await this.telegramService.webhook(dataPost);
    res.status(result.statusCode).send(result);
  }
}
