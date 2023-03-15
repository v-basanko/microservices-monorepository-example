import { IsString } from 'class-validator';
import {IBook} from "@microservices-monorepository-example/interfaces";

export namespace BookGetBook {

  export const topic = 'payment.get-payment.query';

  export class Request {

    @IsString()
    id: string;

  }

  export class Response {
    book: IBook | null;
  }
}
