import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {

    @Get()
    getHello(): string {
        return "ON5-Middleware Running Well";
    }
}