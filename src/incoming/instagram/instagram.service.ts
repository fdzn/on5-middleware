import { Injectable } from '@nestjs/common';

@Injectable()
export class InstagramService {
  async webhook(data) {
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
