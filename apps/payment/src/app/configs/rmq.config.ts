import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import process from "process";
import { QueueNames } from "@microservices-monorepository-example/enums";

export const getRMQConfig = ():MicroserviceOptions=>({
  transport: Transport.RMQ,
  options: {
    urls:[`amqp://${process.env.AMQP_LOGIN}:${process.env.AMQP_PASSWORD}@${process.env.AMQP_HOST}:5672`],
    queue: process.env[QueueNames.PAYMENT],
    queueOptions: {
      durable: false
    },
    noAck: true,
  }
});
