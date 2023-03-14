import { IsString } from 'class-validator';
import {IBook} from "@microservices-monorepository-example/interfaces";

export namespace BookGetBook {

  export const topic = 'book.get-book.query';

  export class Request {

    @IsString()
    id: string;

  }

  export class Response {
    book: IBook;
  }
}
