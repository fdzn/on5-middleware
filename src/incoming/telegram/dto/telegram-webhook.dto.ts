import { IsNotEmpty, IsOptional } from 'class-validator';

export class WebhookPost {
  @IsNotEmpty()
  from: string;

  @IsOptional()
  fromName: string;

  @IsOptional()
  convId: string;

  @IsOptional()
  message: string;

  @IsOptional()
  media: string;
}
