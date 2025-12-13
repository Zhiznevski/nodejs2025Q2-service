import { Request, Response, NextFunction } from "express";
import { Injectable, NestMiddleware } from "@nestjs/common";
import { LoggingService } from "./logger.service";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new LoggingService("HTTP");

  use(request: Request, response: Response, next: NextFunction): void {
    const { method, originalUrl, query, body } = request;

    response.on("finish", () => {
      const { statusCode } = response;

      this.logger.log(
        `method: ${method}, url: ${originalUrl}, statusCode: ${statusCode}, query: ${JSON.stringify(query)}, body: ${JSON.stringify(body)}`,
      );
    });

    next();
  }
}
