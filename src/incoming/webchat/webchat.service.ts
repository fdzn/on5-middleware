import { Injectable, HttpService } from '@nestjs/common';
import { ChatbotON5, WebchatON5 } from './dto/webchat-incoming.dto';
import { mCustomerON5 } from '../customer.dto'
@Injectable()
export class WebchatService {
  constructor(private http: HttpService) { }
  async bot(data) {
    try {
      const host = process.env.ENDPOIN_ON5;
      let sendToON5 = new ChatbotON5();
      sendToON5.channel_id = 15;
      sendToON5.conv_id = data.conv_id;
      sendToON5.from = data.from;
      sendToON5.from_name = data.from_name;
      sendToON5.media = data.media;
      sendToON5.message = data.message;
      sendToON5.message_type = data.message_type;
      sendToON5.tenant_id = data.tenant_id;
      if (data.channel_id == 15) {
        this.http
          .post(`${host}/v1/incoming/chatbot`, data)
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

  async octopushChat(data) {
    try {
      const host = process.env.ENDPOIN_ON5;
      let sendToON5 = new WebchatON5();
      sendToON5.channel_id = 3;
      sendToON5.conv_id = data.message.token;
      switch (data.action) {
        case "createSession":
          let message = "";
          for (const property in data.message) {
            if (property != "token") {
              message += `${property}: ${data.message[property]}
            `;
            }

          }
          sendToON5.from = data.message.email;
          sendToON5.from_name = data.message.username;
          sendToON5.message = message;
          sendToON5.message_type = "text";
          sendToON5.tenant_id = "on5";
          sendToON5.custData = new mCustomerON5()
          sendToON5.custData.cust_email = data.message.email;
          sendToON5.custData.cust_hp = data.message.mobilePhone;
          break;
        case "clientReplyText":
          sendToON5.from = data.message.user.email;
          sendToON5.from_name = data.message.user.username;
          sendToON5.message = data.message.message;
          sendToON5.message_type = "text";
          sendToON5.tenant_id = "on5";
          sendToON5.custData = new mCustomerON5()
          sendToON5.custData.cust_email = data.message.user.email;
          sendToON5.custData.cust_hp = data.message.user.mobilePhone;
          break;
        case "clientReplyMedia":
          sendToON5.from = data.message.user.email;
          sendToON5.from_name = data.message.user.username;
          sendToON5.message = data.message.message.fileName;
          sendToON5.media = data.message.message.url;
          sendToON5.message_type = "media";
          sendToON5.tenant_id = "on5";
          sendToON5.custData = new mCustomerON5()
          sendToON5.custData.cust_email = data.message.user.email;
          sendToON5.custData.cust_hp = data.message.user.mobilePhone;
          break;
        default:
          break;
      }
      this.http
        .post(`${host}/v1/incoming/webchat`, sendToON5)
        .subscribe(res => {
          console.log('http response', res.data);
        });
      return {
        isError: false,
        data: sendToON5,
        statusCode: 201,
      };
    } catch (error) {
      console.error(error)
      return { isError: true, data: error.message, statusCode: 500 };
    }
  }
}
