import { IPayment } from "@microservices-monorepository-example/interfaces";
import { PaymentStatus } from "@microservices-monorepository-example/enums";

export class PaymentEntity implements IPayment {
  _id?: string;
  status: PaymentStatus;
  bookId: string;
  userId: string;
  sum: number;

  constructor(payment: IPayment) {
    this._id = payment._id;
    this.status = payment.status || PaymentStatus.IN_PROGRESS;
    this.bookId = payment.bookId;
    this.userId = payment.userId;
    this.sum = payment.sum;
  }

  paid() {
    this.status = PaymentStatus.SUCCESS;
    return this;
  }

  cancel() {
    this.status = PaymentStatus.CANCELED;
    return this;
  }
}
