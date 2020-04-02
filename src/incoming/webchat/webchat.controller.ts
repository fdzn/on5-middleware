import { Controller, Get, Post, Res, Body } from '@nestjs/common';
import { Response } from 'express';
import { WebchatService } from './webchat.service';
@Controller('incoming/webchat')
export class WebchatController {
  constructor(private readonly webchatService: WebchatService) {}

  @Post()
  async general(@Body() dataPost: any, @Res() res: Response) {
    console.log('incoming webchat dimas', dataPost);
    // const result = await this.webchatService.bot(dataPost);
    // res.status(result.statusCode).send(result);
    res.status(200).send(dataPost);
  }

  @Post('bot')
  async bot(@Body() dataPost: any, @Res() res: Response) {
    console.log('incoming webchat BOT', dataPost);
    const result = await this.webchatService.bot(dataPost);
    res.status(result.statusCode).send(result);
  }
}
