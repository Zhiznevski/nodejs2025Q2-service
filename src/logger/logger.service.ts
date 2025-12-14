import {
  Injectable,
  ConsoleLogger,
  LoggerService,
  LogLevel,
} from '@nestjs/common';

@Injectable()
export class LoggingService extends ConsoleLogger implements LoggerService {
  private readonly logLevels: LogLevel[] = [];
  constructor(context?: string) {
    super(context);
    this.logLevels = process.env.LOGGING_LEVELS?.split(', ') as LogLevel[];
    console.log(this.logLevels);
    this.setLogLevels(this.logLevels);
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
