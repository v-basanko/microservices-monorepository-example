
export enum UserRole {
  Admin = 'Admin',
  Manager = 'Manager',
  Visitor = 'Visitor'
}

export interface IUser {
  _id?: string;
  displayName?: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  books?: Array<IUserBooks>
}

export enum PurchaseState {
  Started = 'Started',
  WaitingForPayment = 'WaitingForPayment',
  Purchased = 'Purchased',
  Canceled = 'Canceled'
}

export interface  IUserBooks {
  bookId: string;
  purchaseState: PurchaseState
}
