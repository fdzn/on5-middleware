import { Controller, Post, Res, Body } from '@nestjs/common';
import { Response } from 'express';
import { InstagramService } from './instagram.service';
@Controller('incoming/instagram')
export class InstagramController {
  constructor(private readonly instagramService: InstagramService) {}
  @Post('webhook')
  async webhook(@Body() dataPost: any, @Res() res: Response) {
    const result = await this.instagramService.webhook(dataPost);
    res.status(result.statusCode).send(result);
  }
}
