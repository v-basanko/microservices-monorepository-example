import {Document} from "mongoose";
import {IUser, IUserBooks, PurchaseState, UserRole} from "@microservices-monorepository-example/interfaces";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

@Schema()
export class UserBooks extends Document implements IUserBooks {

  @Prop({ required: true })
  bookId: string;

  @Prop({ required: true, enum: PurchaseState, type: String })
  purchaseState: PurchaseState;
}

export const UserBooksSchema = SchemaFactory.createForClass(UserBooks)

@Schema()
export class User extends Document implements IUser {

  @Prop()
  displayName?: string;

  @Prop({ required: true })
  email: string;

  @Prop({required: true})
  passwordHash: string;

  @Prop({ required: true, enum: UserRole, type: String, default: UserRole.Visitor})
  role: UserRole

  @Prop({ type: [UserBooksSchema], _id: false })
  books: Array<UserBooks>
}

export const UserSchema = SchemaFactory.createForClass(User);




