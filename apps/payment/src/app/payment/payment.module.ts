import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { PaymentRepository } from "./repositories/payment.repository";
import { Payment, PaymentSchema } from "./models/payment.model";
import { PaymentController } from "./payment.controller";
import { PaymentService } from "./payment.service";

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Payment.name,
      schema: PaymentSchema
    }]),
  ],
  providers: [PaymentRepository, PaymentService],
  controllers: [PaymentController]
})
export class PaymentModule {}
