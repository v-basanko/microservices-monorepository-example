import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { Book } from "../models/book.model";
import { BookEntity } from "../entities/book.entity";

@Injectable()
export class BookRepository {

  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<Book>
  ) {}

  async createBook(book: BookEntity) {
    const newBook = new this.bookModel(book);
    await newBook.save();
    return {
      book: newBook
    }
  }

  async findBookById(id: string) {
    const book = await this.bookModel.findById(id).exec();
    return { book }
  }

  async deleteBook(id: string) {
    await this.bookModel.deleteOne({ _id: id }).exec();
  }
}
