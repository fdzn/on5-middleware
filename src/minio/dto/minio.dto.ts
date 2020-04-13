import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  MinLength,
} from 'class-validator';

export class UploadPost {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  folder: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  directory: string;
}

export class DownloadPost {
  @IsString()
  @IsNotEmpty()
  token: string;
}

export class ResultDownload {
  @IsString()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsNotEmpty()
  originFileName: string;

  @IsString()
  @IsNotEmpty()
  fileName: string;

  @IsString()
  @IsNotEmpty()
  mimeType: string;

  @IsNumber()
  @IsNotEmpty()
  size: number;

  @IsString()
  @IsNotEmpty()
  token: string;
}
