import { IsString } from 'class-validator';
import { PaymentStatus } from "@microservices-monorepository-example/enums";

export namespace PaymentCheck {

  export const topic = 'payment.check.query';

  export class Request {
    @IsString()
    id: string;
  }

  export class Response {
    status: PaymentStatus
  }
}
