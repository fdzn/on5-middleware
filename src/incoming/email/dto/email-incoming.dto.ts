import { IsNotEmpty, IsOptional } from 'class-validator';

export class EmailON5 {
  @IsNotEmpty()
  message_id: string;

  @IsOptional()
  message_id_references: string;

  @IsOptional()
  in_reply_to: string;

  @IsNotEmpty()
  from: string;

  @IsNotEmpty()
  to: string;

  @IsOptional()
  cc: string;

  @IsOptional()
  bcc: string;

  @IsOptional()
  subject: string;

  @IsNotEmpty()
  message_text: string;

  @IsNotEmpty()
  message_html: string;

  @IsOptional()
  attachment: string;
}
