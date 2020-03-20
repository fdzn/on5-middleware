import { Injectable, HttpService } from '@nestjs/common';
import { ChatbotON5 } from './dto/webchat-incoming.dto';
@Injectable()
export class WebchatService {
  constructor(private http: HttpService) {}
  async bot(data) {
    try {
      let sendToON5 = new ChatbotON5();
      sendToON5.channel_id = 15;
      sendToON5.conv_id = data.conv_id;
      sendToON5.from = data.from;
      sendToON5.from_name = data.from_name;
      sendToON5.media = data.media;
      sendToON5.message = data.message;
      sendToON5.message_type = data.message_type;
      sendToON5.tenant_id = data.tenant_id;
      if(data.channel_id == 15){
        this.http
          .post('http://on5.infomedia.co.id/v1/incoming/chatbot', data)
          .subscribe(res => {
            console.log('http response', res.data);
          });
      }
      return {
        isError: false,
        data: 'incoming success',
        statusCode: 201,
      };
    } catch (error) {
      return { isError: true, data: error.message, statusCode: 500 };
    }
  }
}
