import { Module } from '@nestjs/common';
import { LoggingService } from './logger.service';
import { FileWriterService } from './file-writer.service';
import { LoggerMiddleware } from './logger.middleware';

@Module({
  providers: [FileWriterService, LoggingService, LoggerMiddleware],
  exports: [LoggingService],
})
export class LoggerModule {}
