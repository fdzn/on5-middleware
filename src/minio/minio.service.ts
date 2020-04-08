import { Injectable } from '@nestjs/common';

@Injectable()
export class MinioService {
  async upload(data) {
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

  async download(data) {
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
