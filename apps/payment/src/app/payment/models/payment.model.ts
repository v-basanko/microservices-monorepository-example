import { Document } from "mongoose";
import { IPayment } from "@microservices-monorepository-example/interfaces";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { PaymentStatuses } from "@microservices-monorepository-example/enums";

@Schema()
export class Payment extends Document implements IPayment {

  @Prop({ required: true, type: String })
  bookId: string;

  @Prop({ required: true, type: String })
  userId: string;

  @Prop({ required: true, enum: PaymentStatuses, type: String })
  status: PaymentStatuses;

  @Prop({ required: true, default: 0 , type: Number })
  sum: number;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);




