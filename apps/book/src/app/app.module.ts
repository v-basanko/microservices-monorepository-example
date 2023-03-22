import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { getMongoConfig } from "./configs/mongo.config";
import { BookModule } from "./book/book.module";


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
