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
    this.writeAllLogsToFile(message);
  }

  error(message: any) {
    super.error(message);
    this.writeErrorLogsToFile(message);
    this.writeAllLogsToFile(message);
  }

  fatal(message: any) {
    super.fatal(message);
    this.writeErrorLogsToFile(message);
    this.writeAllLogsToFile(message);
  }

  warn(message: any) {
    super.warn(message);
    this.writeAllLogsToFile(message);
  }

  debug(message: any) {
    super.debug(message);
    this.writeAllLogsToFile(message);
  }

  verbose(message: any) {
    super.verbose(message);
    this.writeAllLogsToFile(message);
  }

  private async writeAllLogsToFile(message: any) {
    try {
      const line = formatLogMessage(message);
      await this.fileWriter.appendAllLogs(line);
    } catch (error) {
      super.error('Failed to write log to file', error);
    }
  }

  private async writeErrorLogsToFile(message: any) {
    try {
      const line = formatLogMessage(message);
      await this.fileWriter.appendErrorLog(line);
    } catch (error) {
      super.error('Failed to write error log to file', error);
    }
  }
}
