
import { ApiExcludeController } from '@nestjs/swagger';
import { Controller, Get, Req } from '@nestjs/common';
import { Public } from './auth/decorators/public.decorator';

@ApiExcludeController()
@Controller('/')
export class AppController {
  @Public()
  @Get()
  startApp(): string {
    return `Hello! to check app documentation, visit http://localhost:${process.env.PORT}/doc`
  }
}
