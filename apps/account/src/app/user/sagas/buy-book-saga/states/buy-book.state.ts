import { BuyBookSaga } from "../buy-book.saga";
import { UserEntity } from "../../../entities/user.entity";
import {PaymentCheck} from "@microservices-monorepository-example/contracts";

export abstract class BuyBookSagaState {
  public saga: BuyBookSaga;

  public setContext(saga: BuyBookSaga) {
    this.saga = saga;
  }

  public abstract pay(): Promise<{ paymentLink: string, user: UserEntity }>
  public abstract checkPayment():  Promise<{ user: UserEntity }>
  public abstract cancel(): Promise<{ user: UserEntity }>
}
