import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { BookRepository } from "./repositories/book.repository";
import { BookCommands } from "./book.commands";
import { BookQueries } from "./book.queries";
import { Book, BookSchema } from "./models/book.model";

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Book.name,
      schema: BookSchema
    }]),
  ],
  providers: [BookRepository],
  exports: [BookRepository],
  controllers: [BookCommands, BookQueries]
})
export class BookModule {}
