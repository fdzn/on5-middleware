// import { IsNotEmpty, IsOptional } from 'class-validator';
import { mCustomerON5 } from '../../customer.dto';

export class TwitterMentionON5 {
  tenant_id: string;
  channel_id: number;
  stream_to_id: string;
  stream_id: string;
  from: string;
  from_name: string;
  message_type: string;
  message: string;
  media: string;
  date_stream: Date;
  additionalInfo: any;
  custData: mCustomerON5;
}
