import { PaymentStatus } from "@microservices-monorepository-example/enums";

export interface IPayment {
  _id?: string;
  status?: PaymentStatus;
  bookId: string;
  userId: string;
  sum: number;
}
