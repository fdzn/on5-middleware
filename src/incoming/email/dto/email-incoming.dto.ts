import { IsNotEmpty, IsInt, IsOptional } from "class-validator";

export class EmailAttachment {
  content_id: string;
  content_type: string;
  content_disp: string;
  file_name: string;
  size: number;
  path: object;
}

export class EmailON5 {
  @IsInt()
  @IsNotEmpty()
  channel_id: number;

  @IsNotEmpty()
  from: string;

  @IsNotEmpty()
  from_name: string;

  @IsNotEmpty()
  message_id: string;

  @IsOptional()
  message_id_references: string;

  @IsOptional()
  in_reply_to: string;

  @IsNotEmpty()
  from_email: string;

  @IsNotEmpty()
  to_email: string;

  @IsOptional()
  cc_email: string;

  @IsOptional()
  bcc_email: string;

  @IsOptional()
  subject: string;

  @IsNotEmpty()
  message_text: string;

  @IsNotEmpty()
  message_html: string;

  @IsOptional()
  attachment: EmailAttachment[];

  @IsNotEmpty()
  account:string;
}
