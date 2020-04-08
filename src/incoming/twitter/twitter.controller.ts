import { Controller, Post, Res, Body } from '@nestjs/common';
import { Response } from 'express';
import { TwitterService } from './twitter.service';
@Controller('incoming/twitter')
export class TwitterController {
  constructor(private readonly twitterService: TwitterService) {}

  @Post('webhook')
  async webhook(@Body() dataPost: any, @Res() res: Response) {
    const result = await this.twitterService.webhook(dataPost);
    res.status(result.statusCode).send(result);
  }
}
