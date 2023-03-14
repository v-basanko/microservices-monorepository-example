import {ClientsModuleAsyncOptions, MicroserviceOptions, Transport} from "@nestjs/microservices";
import * as process from "process";
import {ConfigModule, ConfigService} from "@nestjs/config";
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

export const getClientRMQConfig = ():ClientsModuleAsyncOptions=>([{
  name: 'amqp-transport-service',
  inject: [ConfigService],
  imports: [ConfigModule],
  useFactory: (configService: ConfigService)=>({
    transport: Transport.RMQ,
    options: {
      urls:[`amqp://${configService.get('AMQP_LOGIN')}:${configService.get('AMQP_PASSWORD')}@${configService.get('AMQP_HOST')}:5672`],
      queue: configService.get('AMQP_QUEUE'),
      queueOptions: {
        durable: false
      },
      noAck: true
    }})
}])
