import { IsString } from 'class-validator';
import { PurchaseState } from "@microservices-monorepository-example/interfaces";

export namespace AccountChengeBook {

  export const topic = 'account.change-book.event';

  export class Request {

    @IsString()
    userId: string;

    @IsString()
    bookId: string;

    @IsString()
    state: PurchaseState;
  }
}
