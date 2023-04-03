import { Controller, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { QueueNames } from "@microservices-monorepository-example/enums";

@Controller('payment')
export class AuthController {
  constructor(@Inject(QueueNames.PAYMENT) private paymentRMQService: ClientProxy) {}

}
