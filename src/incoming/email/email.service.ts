import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  async webhook(data) {
    try {
      return {
        isError: false,
        data: data,
        statusCode: 200,
      };
    } catch (error) {
      return { isError: true, data: error.message, statusCode: 500 };
    }
  }
}
