import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import * as process from "process";
export const getRMQConfig = ():MicroserviceOptions=>({
  transport: Transport.RMQ,
  options: {
    urls:[`amqp://${process.env.AMQP_LOGIN}:${process.env.AMQP_PASSWORD}@${process.env.AMQP_HOST}:5672`],
    queue: process.env.AMQP_QUEUE,
    queueOptions: {
      durable: false
    },
    noAck: true,
  }
});
