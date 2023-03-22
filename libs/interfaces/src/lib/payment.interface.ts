import { PaymentStatuses } from "@microservices-monorepository-example/enums";

export interface IPayment {
  _id?: string;
  status?: PaymentStatuses;
  bookId: string;
  userId: string;
  sum: number;
}
