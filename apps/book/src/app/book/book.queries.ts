import {
  Body,
  Controller,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { MessagePattern } from "@nestjs/microservices";
import { BookGetBook } from "@microservices-monorepository-example/contracts";
import { BookRepository } from "./repositories/book.repository";

@Controller('book')
export class BookQueries {
  constructor(private readonly bookRepository: BookRepository) {}

  @UsePipes(new ValidationPipe())
  @MessagePattern({topic: BookGetBook.topic})
  async getBookById(@Body() { id }: BookGetBook.Request):Promise<BookGetBook.Response> {
    return await this.bookRepository.findBookById(id);
  }
}
