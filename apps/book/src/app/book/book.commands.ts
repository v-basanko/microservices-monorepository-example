import {
  Body,
  Controller,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { MessagePattern } from "@nestjs/microservices";
import { BookCreateBook } from "@microservices-monorepository-example/contracts";
import { BookRepository } from "./repositories/book.repository";

@Controller('book')
export class BookCommands {
  constructor(private readonly bookRepository: BookRepository) {}

  @UsePipes(new ValidationPipe())
  @MessagePattern({topic: BookCreateBook.topic})
  async createBook(@Body() dto: BookCreateBook.Request):Promise<BookCreateBook.Response> {
    return await this.bookRepository.createBook(dto);
  }
}
