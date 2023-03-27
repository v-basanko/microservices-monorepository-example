import { Body, Controller, Get, Inject, Param, Post, UnauthorizedException, UseGuards } from '@nestjs/common';
import { JWTAuthGuard } from "../guards/jwt.guard";
import { ClientProxy } from "@nestjs/microservices";
import { BookCreateBook, BookGetBook } from "@microservices-monorepository-example/contracts";
import { firstValueFrom } from "rxjs";
import { BookDto } from "../dtos/book.dto";
import { QueueNames } from "@microservices-monorepository-example/enums";
import { GetBookDto } from "../dtos/get-book.dto";

@Controller('book')
export class BookController {
  constructor(@Inject(QueueNames.BOOK) private client: ClientProxy) {}

  @UseGuards(JWTAuthGuard)
  @Get(':id')
  async getBook(@Param() { id }: GetBookDto) {
    try{
      return await firstValueFrom<BookGetBook.Response>(this.client.send({ topic: BookGetBook.topic }, { id }));
    } catch (ex) {
      if(ex instanceof Error) {
        throw new UnauthorizedException(ex.message);
      }
    }
  }

  @UseGuards(JWTAuthGuard)
  @Post('')
  async createBook(@Body() book: BookDto) {
    try{
      return await firstValueFrom<BookCreateBook.Response>(this.client.send({ topic: BookCreateBook.topic }, book));
    } catch (ex) {
      if(ex instanceof Error) {
        throw new UnauthorizedException(ex.message);
      }
    }
  }
}
