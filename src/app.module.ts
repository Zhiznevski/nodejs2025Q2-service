import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService],
})
export class AppModule { }
