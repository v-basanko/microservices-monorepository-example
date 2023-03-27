import { IsString } from 'class-validator';

export namespace AccountBuyBook {

  export const topic = 'account.buy-book.command';

  export class Request {

    @IsString()
    userId: string;

    @IsString()
    bookId: string;

  }

  export class Response {
    paymentLink: string;
  }
}
