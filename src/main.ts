import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger(); 
  const corsOptions: CorsOptions = {
    origin: 'https://hrms24.vercel.app/auth/auth1/login', // Change to your frontend domain
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept',
    credentials: true, // If you need to allow cookies
  };
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors(corsOptions);
  app.useGlobalPipes(new ValidationPipe());
  const port = 3000;
  await app.listen(port);
  logger.log(`Application running on port ${port}`);
}
bootstrap();
