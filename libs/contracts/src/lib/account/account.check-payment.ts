import { IsString } from 'class-validator';
import { PaymentStatuses } from "@microservices-monorepository-example/enums";

export namespace AccountCheckPayment {

  export const topic = 'account.check-payment.command';

  export class Request {

    @IsString()
    userId: string;

    @IsString()
    bookId: string;

  }

  export class Response {
    status: PaymentStatuses;
  }
}
