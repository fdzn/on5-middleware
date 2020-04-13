import { Injectable, HttpService } from '@nestjs/common';

import { EmailON5, EmailAttachment } from './dto/email-incoming.dto';

@Injectable()
export class EmailService {
  constructor(private http: HttpService) {}
  async general(data) {
    try {
      const host = process.env.ENDPOIN_ON5;
      let sendToON5 = new EmailON5();
      if (data.attachments.length > 0) {
        sendToON5.attachment = data.attachments.map(item => {
          let attachmentObj = new EmailAttachment();
          attachmentObj.content_id = item.cid;
          attachmentObj.content_type = item.contentType;
          attachmentObj.content_disp = item.contentDisposition;
          attachmentObj.file_name = item.filename;
          attachmentObj.size = item.size;
          attachmentObj.path = {
            url: item.url,
            token: item.token,
          };
          return attachmentObj;
        });
      } else {
        sendToON5.attachment = [];
      }
      sendToON5.channel_id = 2;
      sendToON5.from = data.from.value[0].address;
      sendToON5.from_name = data.from.value[0].name;

      sendToON5.message_id = data.messageId;
      sendToON5.message_id_references = data.references
        ? data.references
        : null;
      sendToON5.in_reply_to = data.inReplyTo ? data.inReplyTo : null;

      sendToON5.subject = data.subject;
      sendToON5.from_email = data.from.value;
      sendToON5.to_email = data.to.value;
      sendToON5.cc_email = data.cc ? data.cc.value : null;
      sendToON5.bcc_email = data.bcc ? data.bcc.value : null;
      sendToON5.message_html = data.html;
      sendToON5.message_text = data.text;

      sendToON5.account = data.tenant_account[0].address;
      const result = await this.http
        .post(`${host}/v1/incoming/email`, sendToON5)
        .toPromise();
      return {
        isError: false,
        data: result.data,
        statusCode: 201,
      };
    } catch (e) {
      //ERROR HTTP
      if (e.response) {
        console.error(e.response.data);
        return {
          isError: true,
          data: e.response.statusText,
          statusCode: e.response.status,
        };
      } else {
        //ERROR GENERAL
        console.error(e);
        return { isError: true, data: e.message, statusCode: 500 };
      }
    }
  }
}
