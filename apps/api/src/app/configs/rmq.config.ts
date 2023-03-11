import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientsModuleAsyncOptions, Transport } from "@nestjs/microservices";

export const getRMQConfig = ():ClientsModuleAsyncOptions=>([{
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
