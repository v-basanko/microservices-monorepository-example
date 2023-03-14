import { Document } from "mongoose";
import { IBook } from "@microservices-monorepository-example/interfaces";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Book extends Document implements IBook {

  @Prop({ required: true, default: 0, type: Number })
  price: number;

  @Prop({ required: true, type: String })
  name: string;

}

export const BookSchema = SchemaFactory.createForClass(Book);




