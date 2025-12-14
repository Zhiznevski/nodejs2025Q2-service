import { Injectable, ConsoleLogger, LoggerService } from '@nestjs/common';
import { FileWriterService } from './file-writer.service';
import { formatLogMessage, getLogLevels } from './logger-helpers';

@Injectable()
export class LoggingService extends ConsoleLogger implements LoggerService {
  constructor(private readonly fileWriter: FileWriterService) {
    super();
    const levels = getLogLevels(Number(process.env.LOG_LEVEL));
    this.setLogLevels(levels);
  }

  log(message: any) {
    super.log(message);
    this.writeToFile(message);
  }

  error(message: any) {
    super.error(message);
    this.writeToFile(message);
  }

  fatal(message: any) {
    super.fatal(message);
    this.writeToFile(message);
  }

  warn(message: any) {
    super.warn(message);
    this.writeToFile(message);
  }

  debug(message: any) {
    super.debug(message);
    this.writeToFile(message);
  }

  verbose(message: any) {
    super.verbose(message);
    this.writeToFile(message);
  }

  private async writeToFile(message: any) {
    try {
      const line = formatLogMessage(message);
      await this.fileWriter.appendLine(line);
    } catch (error) {
      super.error('Failed to write log to file', error);
    }
  }
}
