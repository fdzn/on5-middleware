import { IsNotEmpty, IsInt, IsOptional } from 'class-validator';
import { mCustomerON5 } from '../../customer.dto'
export class EmailAttachment {
  content_id: string;
  content_type: string;
  content_disp: string;
  file_name: string;
  size: number;
  path: object;
}

export class ChatbotON5 {
  @IsNotEmpty()
  tenant_id: string;

  @IsNotEmpty()
  channel_id: number;

  @IsNotEmpty()
  conv_id: string;

  @IsNotEmpty()
  from: string;

  @IsNotEmpty()
  from_name: string;

  @IsNotEmpty()
  message_type: string;

  @IsNotEmpty()
  message: string;

  @IsNotEmpty()
  media: string;
}

export class WebchatON5 {
  @IsNotEmpty()
  tenant_id: string;

  @IsNotEmpty()
  channel_id: number;

  @IsNotEmpty()
  conv_id: string;

  @IsNotEmpty()
  from: string;

  @IsNotEmpty()
  from_name: string;

  @IsNotEmpty()
  message_type: string;

  @IsNotEmpty()
  message: string;

  media: string;

  @IsNotEmpty()
  custData: mCustomerON5;
}
