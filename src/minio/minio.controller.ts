import { Controller, Post, Res, Body } from '@nestjs/common';
import { Response } from 'express';
import { MinioService } from './minio.service';
@Controller('minio')
export class MinioController {
  constructor(private readonly minioService: MinioService) {}

  @Post('upload')
  async upload(@Body() dataPost: any, @Res() res: Response) {
    const result = await this.minioService.upload(dataPost);
    res.status(result.statusCode).send(result);
  }

  @Post('download')
  async download(@Body() dataPost: any, @Res() res: Response) {
    const result = await this.minioService.download(dataPost);
    res.status(result.statusCode).send(result);
  }
}
