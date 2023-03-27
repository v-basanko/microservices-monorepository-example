import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MicroserviceOptions } from "@nestjs/microservices";
import { getRMQServerConfig } from "@microservices-monorepository-example/configs";
import { QueueNames } from "@microservices-monorepository-example/enums";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, getRMQServerConfig(QueueNames.PAYMENT))
  await app.listen();
  Logger.log(
    `🚀 Payment microservice is running`
  );
}

bootstrap();
