import {IPayment} from "@microservices-monorepository-example/interfaces";
import {PaymentStatuses} from "@microservices-monorepository-example/enums";

export class PaymentEntity implements IPayment {
  _id?: string;
  status: PaymentStatuses;
  bookId: string;
  userId: string;
  sum: number;

  constructor(payment: IPayment) {
    this._id = payment._id;
    this.status = payment.status || PaymentStatuses.IN_PROGRESS;
    this.bookId = payment.bookId;
    this.userId = payment.userId;
    this.sum = payment.sum;
  }

  paid() {
    this.status = PaymentStatuses.SUCCESS;
    return this;
  }

  cancel() {
    this.status = PaymentStatuses.CANCELED;
    return this;
  }
}
