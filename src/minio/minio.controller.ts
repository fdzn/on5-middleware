import {
  Controller,
  Body,
  Post,
  Res,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { Response } from 'express';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { MinioNestService } from './minio.service';
import { BufferedFile } from './dto/file.model';
import { UploadPost, DownloadPost } from './dto/minio.dto';
@Controller('minio')
export class MinioController {
  constructor(private minioNestService: MinioNestService) {}
  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  async upload(
    @UploadedFiles() files: BufferedFile,
    @Body() dataPost: UploadPost,
    @Res() res: Response,
  ) {
    let result = await this.minioNestService.upload(files, dataPost);
    res.status(result.statusCode).send(result);
  }

  @Post('download')
  async download(@Body() dataPost: DownloadPost, @Res() res: Response) {
    let result = await this.minioNestService.download(dataPost);
    res.status(result.statusCode).send(result);
  }
}
