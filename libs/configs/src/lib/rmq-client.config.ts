import { ClientsModuleAsyncOptions, Transport } from "@nestjs/microservices";
import { ConfigModule, ConfigService } from "@nestjs/config";

export const getRmqClientConfig = (queueName):ClientsModuleAsyncOptions=>([{
  name: queueName,
  inject: [ConfigService],
  imports: [ConfigModule],
  useFactory: (configService: ConfigService)=>({
    transport: Transport.RMQ,
    options: {
      urls:[`amqp://${configService.get('AMQP_LOGIN')}:${configService.get('AMQP_PASSWORD')}@${configService.get('AMQP_HOST')}:5672`],
      queue: configService.get(queueName),
      queueOptions: {
        durable: false
      },
    }})
}])
