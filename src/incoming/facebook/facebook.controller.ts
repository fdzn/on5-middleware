import { Controller, Post, Res, Body } from '@nestjs/common';
import { Response } from 'express';
import { FacebookService } from './facebook.service';
@Controller('incoming/facebook')
export class FacebookController {
  constructor(private readonly facebookService: FacebookService) {}

  @Post('webhook')
  async webhook(@Body() dataPost: any, @Res() res: Response) {
    const result = await this.facebookService.webhook(dataPost);
    res.status(result.statusCode).send(result);
  }
}
