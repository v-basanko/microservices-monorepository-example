import { IsString } from 'class-validator';
import { PaymentStatuses } from "@microservices-monorepository-example/enums";

export namespace PaymentCheck {

  export const topic = 'payment.check.query';

  export class Request {
    @IsString()
    id: string;
  }

  export class Response {
    status: PaymentStatuses
  }
}
