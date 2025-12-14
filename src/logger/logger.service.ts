import {
  Injectable,
  ConsoleLogger,
  LoggerService,
  LogLevel,
} from '@nestjs/common';
import { FileWriterService } from './file-writer.service';
import { formatLogMessage } from './logger-helpers';

@Injectable()
export class LoggingService extends ConsoleLogger implements LoggerService {
  private readonly logLevels: LogLevel[] = [];
  constructor(private readonly fileWriter: FileWriterService) {
    super();
    this.logLevels = process.env.LOGGING_LEVELS?.split(',')
      .map((level) => level.trim())
      .filter(Boolean) as LogLevel[];
    this.setLogLevels(this.logLevels);
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
