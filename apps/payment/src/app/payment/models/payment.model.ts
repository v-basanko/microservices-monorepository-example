import { Document } from "mongoose";
import { IPayment } from "@microservices-monorepository-example/interfaces";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { PaymentStatus } from "@microservices-monorepository-example/enums";

@Schema()
export class Payment extends Document implements IPayment {

  @Prop({ required: true, type: String })
  bookId: string;

  @Prop({ required: true, type: String })
  userId: string;

  @Prop({ required: true, enum: PaymentStatus, type: String })
  status: PaymentStatus;

  @Prop({ required: true, default: 0 , type: Number })
  sum: number;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);




