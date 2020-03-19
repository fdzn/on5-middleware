import { Injectable } from '@nestjs/common';

@Injectable()
export class WebchatService {
  async bot(data) {
    try {
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
