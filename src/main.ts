import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger(); 
  const corsOptions: CorsOptions = {
    origin: ['http://localhost:3000', 'https://www.hrms24.com'],
    allowedHeaders: ['Accept', 'Content-Type'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  };
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    next();
  });

  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
  });
  // const app = await NestFactory.create(AppModule, { cors: true });
  // app.enableCors(corsOptions);
  app.useGlobalPipes(new ValidationPipe());
  const port = 3001;
  await app.listen(port);
  logger.log(`Application running on port ${port}`);
}
bootstrap();
