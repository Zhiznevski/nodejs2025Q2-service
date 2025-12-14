import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './swagger';
import { LoggingService } from './logger/logger.service';
import { HttpExceptionFilter } from './logger/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(LoggingService));
  app.useGlobalPipes(new ValidationPipe());
  const loggerService = await app.resolve(LoggingService);
  app.useGlobalFilters(new HttpExceptionFilter(loggerService));
  setupSwagger(app);

  process.on("uncaughtException", (error, origin) => {
    loggerService.error(`${process.stderr.fd}, Caught Exception: ${error}\n +
        Exception origin: ${origin}\n`,
    )
  })

  process.on("unhandledRejection", (reason, promise) => {
    loggerService.error(`Unhandled Rejection at:', ${promise}, reason:, ${reason}`)
  }
  )

  await app.listen(process.env.PORT || 4000);
}
bootstrap();
