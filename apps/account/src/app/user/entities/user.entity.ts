import {IUser, IUserBooks, PurchaseState, UserRole} from "@microservices-monorepository-example/interfaces";
import {compare, genSalt, hash} from "bcryptjs";

export class UserEntity implements IUser{
  _id?: string;
  displayName?: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  books?: Array<IUserBooks>

  constructor(user: IUser) {
    this._id = user._id;
    this.displayName = user.displayName;
    this.email = user.email;
    this.passwordHash = user.passwordHash;
    this.role = user.role;
    this.books = user.books;
  }

  public addBook(bookId: string) {
    const existsBook = this.books.find(b=>b.bookId === bookId);
    if(existsBook) {
      throw new Error('User already have this book');
    }
    this.books.push({
      bookId,
      purchaseState: PurchaseState.Started
    })
  }

  public deleteBook(bookId) {
    this.books = this.books.filter((b:IUserBooks)=>b.bookId !== bookId);
  }

  updateBookStatus(bookId: string, state: PurchaseState) {
    this.books.forEach(b => {
      if (b.bookId === bookId) {
        b.purchaseState = state;
      }
    });
  }

  public getPublicProfile() {
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
