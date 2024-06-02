import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger(); 
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  const port = 3000;
  await app.listen(port);
  logger.log(`Application running on port ${port}`);
}
bootstrap();
