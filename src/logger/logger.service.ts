import { Injectable, ConsoleLogger, LoggerService } from '@nestjs/common';

@Injectable()
export class LoggingService extends ConsoleLogger implements LoggerService {
  constructor(context?: string) {
    super();
    this.setContext(context);
    this.setLogLevels(['warn', 'error', 'debug']);
  }

  log(message: any) {
    super.log(message);
  }

  fatal(message: any) {
    super.fatal(message);
  }

  error(message: any) {
    super.error(message);
  }

  warn(message: any) {
    super.warn(message);
  }

  debug(message: any) {
    super.debug(message);
  }

  verbose(message: any) {
    super.verbose(message);
  }
}
