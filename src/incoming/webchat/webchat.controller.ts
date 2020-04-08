import { Controller, Get, Post, Res, Body } from '@nestjs/common';
import { Response } from 'express';
import { WebchatService } from './webchat.service';
@Controller('incoming/webchat')
export class WebchatController {
  constructor(private readonly webchatService: WebchatService) {}

  @Post()
  async octopushChat(@Body() dataPost: any, @Res() res: Response) {
    const result = await this.webchatService.octopushChat(dataPost);
    res.status(result.statusCode).send(result);
  }

  @Post('bot')
  async bot(@Body() dataPost: any, @Res() res: Response) {
    const result = await this.webchatService.bot(dataPost);
    res.status(result.statusCode).send(result);
  }
}
