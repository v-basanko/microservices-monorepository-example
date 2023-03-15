import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { Payment } from "../models/payment.model";
import { PaymentEntity } from "../entities/payment.entity";

@Injectable()
export class PaymentRepository {

  constructor(
    @InjectModel(Payment.name) private readonly paymentModel: Model<Payment>
  ) {}

  async createPayment(payment: PaymentEntity) {
    const newPayment = new this.paymentModel(payment);
    await newPayment.save();
    return payment;
  }

  async updatePayment({ _id, ...rest }: PaymentEntity) {
    return this.paymentModel.updateOne({ _id }, { $set: { ...rest }}).exec();
  }
}
