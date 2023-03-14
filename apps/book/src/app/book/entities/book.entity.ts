import { IBook } from "@microservices-monorepository-example/interfaces";

export class BookEntity implements IBook{
  _id?: string;
  price: number;
  name: string;

  constructor(book: IBook) {
    this._id = book._id;
    this.price = book.price;
    this.name = book.name;
  }
}
