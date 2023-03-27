import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app/app.module';
import { getRMQServerConfig } from "@microservices-monorepository-example/configs";
import { QueueNames } from "@microservices-monorepository-example/enums";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, getRMQServerConfig(QueueNames.BOOK))
  await app.listen();
  Logger.log(
    `🚀 Book microservice is running`
  );
}

bootstrap();
