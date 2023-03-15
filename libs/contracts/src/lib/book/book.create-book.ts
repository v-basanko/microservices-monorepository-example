import { IsNumber, IsString } from 'class-validator';
import { IBook } from "@microservices-monorepository-example/interfaces";

export namespace BookCreateBook {

  export const topic = 'payment.create-payment.command';

  export class Request {

    @IsString()
    name: string;

    @IsNumber()
    price: number;

  }

  export class Response {
    book: IBook;

  }
}
