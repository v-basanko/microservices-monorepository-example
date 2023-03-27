import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { BookModule } from "./book/book.module";
import { getMongoConfig } from "@microservices-monorepository-example/configs";


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true,  envFilePath: 'envs/.book.env'}),
    MongooseModule.forRootAsync(getMongoConfig()),
    BookModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
