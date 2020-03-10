import { Injectable } from '@nestjs/common';

import { EmailON5 } from './dto/email-incoming.dto';

@Injectable()
export class EmailService {
  async general(data) {
    try {

      let sendToON5 = new EmailON5();
      sendToON5.channel_id = 2
      sendToON5.message_id = data.messageId;
      sendToON5.message_id_references = data.references;
      sendToON5.in_reply_to = data.inReplyTo;

      sendToON5.subject = data.subject;
      sendToON5.from = data.from.value;
      sendToON5.to = data.to.value;
      sendToON5.cc = data.cc.value;
      sendToON5.bcc = data.bcc.value;
      sendToON5.attachment = data.attachment;

      sendToON5.message_html = data.html;
      sendToON5.message_text = data.text;

      return {
        isError: false,
        data: "incoming success",
        statusCode: 200,
      };
    } catch (error) {
      return { isError: true, data: error.message, statusCode: 500 };
    }
  }
}
