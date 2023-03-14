import {GetBookSaga} from "./get-book.saga";
import {UserEntity} from "../entities/user.entity";

export abstract class GetBookSagaState {
  public saga: GetBookSaga;

  public setContext(saga: GetBookSaga) {
    this.saga = saga;
  }

  public abstract pay(): Promise<{ paymentLink: string, user: UserEntity }>
  public abstract checkPayment(): Promise<{ user: UserEntity }>
  public abstract cancel(): Promise<{ user: UserEntity }>
}
