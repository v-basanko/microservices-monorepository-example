import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app/app.module';
import { getRMQConfig } from "./app/configs/rmq.config";
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, getRMQConfig())
  await app.listen();
  Logger.log(
    `🚀 Account microservice is running`
  );
}

bootstrap();
