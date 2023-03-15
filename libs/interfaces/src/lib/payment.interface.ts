export interface IPayment {
  _id?: string;
  isPaid?: boolean;
  bookId: string;
  userId: string;
  sum: number;
}
