import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ENV } from './common/config';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './common/filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalFilters(new AllExceptionsFilter());
  app.enableCors();
  app.enableShutdownHooks();

  await app.listen(ENV.HTTP_PORT);
}
bootstrap();
