import 'dotenv/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './swagger';
import { LoggingService } from './logger/logger.service';
import { AllExceptionsFilter } from './logger/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(LoggingService));
  app.useGlobalPipes(new ValidationPipe());
  const loggerService = app.get(LoggingService);
  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost, loggerService));
  setupSwagger(app);

  process.on('uncaughtException', (error) => {
    loggerService.error(
      `Uncaught exception: ${JSON.stringify(error.message)} ${JSON.stringify(error.stack)}`,
    );
  });

  process.on('unhandledRejection', (reason) => {
    loggerService.error(`Unhandled rejection: ${JSON.stringify(reason)}`);
  });

  await app.listen(process.env.PORT || 4000);
}
bootstrap();
