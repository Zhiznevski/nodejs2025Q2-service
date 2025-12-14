import { Request, Response, NextFunction } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { LoggingService } from './logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly loggingService: LoggingService) {}

  use(request: Request, response: Response, next: NextFunction): void {
    const { method, originalUrl, query } = request;

    response.on('finish', () => {
      const { statusCode } = response;

      this.loggingService.log(
        `method: ${method}, url: ${originalUrl}, statusCode: ${statusCode}, query: ${JSON.stringify(query)}, body: ${JSON.stringify(request.body)}`,
      );
    });

    next();
  }
}
