import { IsString } from 'class-validator';
import { PaymentStatus } from "@microservices-monorepository-example/enums";

export namespace AccountCheckPayment {

  export const topic = 'account.check-payment.command';

  export class Request {

    @IsString()
    userId: string;

    @IsString()
    bookId: string;

  }

  export class Response {
    status: PaymentStatus;
  }
}
