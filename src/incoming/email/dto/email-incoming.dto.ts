import { IsNotEmpty, IsInt, IsOptional } from 'class-validator';

export class EmailON5 {
  @IsInt()
  @IsNotEmpty()
  channel_id: number;

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

export class EmailHeaderON5 {
  @IsNotEmpty()
  from: string;

  @IsNotEmpty()
  from_name: string;

  @IsNotEmpty()
  message_type: string;

  @IsInt()
  @IsNotEmpty()
  channel_id: number;
}
