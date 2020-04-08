import {
  Controller,
  Body,
  Post,
  Res,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { MinioNestService } from './minio.service';
import { BufferedFile } from './dto/file.model';
import { UploadPost, DownloadPost } from './dto/minio.dto';
@Controller('minio')
export class MinioController {
  constructor(private minioNestService: MinioNestService) {}
  @Post('upload/single')
  @UseInterceptors(FileInterceptor('file'))
  async uploadSingle(
    @UploadedFile() file: BufferedFile,
    @Body() dataPost: UploadPost,
    @Res() res: Response,
  ) {
    let result = await this.minioNestService.uploadSingle(file, dataPost);
    res.status(result.statusCode).send(result);
  }

  @Post('download')
  async download(@Body() dataPost: DownloadPost, @Res() res: Response) {
    let result = await this.minioNestService.download(dataPost);
    res.status(result.statusCode).send(result);
  }
}
