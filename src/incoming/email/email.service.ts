import { Injectable } from '@nestjs/common';

import { EmailON5 } from './dto/email-incoming.dto';

@Injectable()
export class EmailService {
  async general(data) {
    try {
      const output = new EmailON5();

      output.message_id = data.messageId;
      output.message_id_references = '';
      output.in_reply_to = '';

      output.subject = data.subject;
      output.from = '';
      output.to = '';
      output.cc = '';
      output.bcc = '';
      output.attachment = '';

      output.message_html = data.html;
      output.message_text = data.text;

      return {
        isError: false,
        data: output,
        statusCode: 200,
      };
    } catch (error) {
      return { isError: true, data: error.message, statusCode: 500 };
    }
  }
}
