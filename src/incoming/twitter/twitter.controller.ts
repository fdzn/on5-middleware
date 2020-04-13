import { Controller, Post, Res, Body } from '@nestjs/common';
import { Response } from 'express';
import { TwitterService } from './twitter.service';
@Controller('incoming/twitter')
export class TwitterController {
  constructor(private readonly twitterService: TwitterService) { }

  @Post('webhook')
  async webhook(@Body() dataPost: object, @Res() res: Response) {
    console.log('Twitter', dataPost);
    const result = await this.twitterService.webhook(dataPost);
    console.log("ON5 Result", result)
    res.status(result.statusCode).send(result);
  }
}
