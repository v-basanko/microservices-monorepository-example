import { compare, genSalt, hash } from "bcryptjs";
import {
  IDomainEvent,
  IUser,
  IUserBooks,
  PurchaseState,
  UserRole
} from "@microservices-monorepository-example/interfaces";
import { PublicProfile } from "@microservices-monorepository-example/types";
import {AccountChengeBook} from "@microservices-monorepository-example/contracts";

export class UserEntity implements IUser{
  _id?: string;
  displayName?: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  books?: Array<IUserBooks>
  events: Array<IDomainEvent> = [];

  constructor(user: IUser) {
    this._id = user._id;
    this.displayName = user.displayName;
    this.email = user.email;
    this.passwordHash = user.passwordHash;
    this.role = user.role;
    this.books = user.books;
  }

  setBookStatus(bookId: string, state: PurchaseState) {
    const existsBook = this.books.find(b=>b.bookId === bookId);
    if(!existsBook) {
      this.books.push({
        bookId,
        purchaseState: state
      });
      return this;
    }

    if(state === PurchaseState.Canceled) {
      this.books = this.books.filter((b:IUserBooks)=>b.bookId !== bookId);
      return this;
    }

    this.books.forEach(b => {
      if (b.bookId === bookId) {
        b.purchaseState = state;
      }
    });
    this.events.push({ topic: AccountChengeBook.topic,  data: {  bookId, userId: this._id, state } })
    return this;
  }

  public getPublicProfile():PublicProfile {
    return {
      email: this.email,
      role: this.role,
      displayName: this.displayName
    }
  }

  public async setPassword(password: string) {
    const salt = await genSalt(10);
    this.passwordHash = await hash(password, salt)
    return this;
  }

  public validatePassword(password: string) {
    return compare(password, this.passwordHash)
  }

  public updateProfile(displayName) {
    this.displayName = displayName;
    return this;
  }
}
