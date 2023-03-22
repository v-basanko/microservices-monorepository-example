import {IsNumber, IsString} from 'class-validator';

export namespace PaymentGenerateLink {

  export const topic = 'payment.genrate-link.command';

  export class Request {

    @IsString()
    bookId: string;

    @IsString()
    userId: string;

    @IsNumber()
    sum: number;

  }

  export class Response {
    id: string;
    paymentLink: string;
  }
}
