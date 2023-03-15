import { IPayment } from "@microservices-monorepository-example/interfaces";

export class PaymentEntity implements IPayment {
  _id?: string;
  isPaid: boolean;
  bookId: string;
  userId: string;
  sum: number;

  constructor(payment: IPayment) {
    this._id = payment._id;
    this.isPaid = payment.isPaid || false;
    this.bookId = payment.bookId;
    this.userId = payment.userId;
    this.sum = payment.sum;
  }

  paid() {
    this.isPaid = true;
    return this;
  }
}
