import { IsString } from 'class-validator';
import { IUserBooks } from "@microservices-monorepository-example/interfaces";

export namespace AccountUserBooks {

  export const topic = 'account.user-books.query';

  export class Request {

    @IsString()
    id: string;

  }

  export class Response {
    books: Array<IUserBooks>;
  }
}
