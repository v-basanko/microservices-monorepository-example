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

  public async createPayment(payment: PaymentEntity): Promise<PaymentEntity> {
    const newPayment = new this.paymentModel(payment);
    await newPayment.save();
    return payment;
  }

  public async updatePayment({ _id, ...rest }: PaymentEntity) {
    return this.paymentModel.updateOne({ _id }, { $set: { ...rest }}).exec();
  }

  public async findById(id: string): Promise<PaymentEntity> {
    const payment = await this.paymentModel.findOne({ _id: id }).exec();
    return new PaymentEntity(payment);
  }
}
