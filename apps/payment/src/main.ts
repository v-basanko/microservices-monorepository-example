import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MicroserviceOptions } from "@nestjs/microservices";
import { getRMQConfig } from "./app/configs/rmq.config";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, getRMQConfig())
  await app.listen();
  Logger.log(
    `🚀 Payment microservice is running`
  );
}

bootstrap();
