import { BuyBookSagaState } from "./buy-book.state";
import { UserEntity } from "../../../entities/user.entity";
import { PurchaseState } from "@microservices-monorepository-example/interfaces";

export class BuyBookSagaStateFinish extends BuyBookSagaState {
  public async pay(): Promise<{ paymentLink: string; user: UserEntity }> {
    this.saga.setState(PurchaseState.Started);
    return this.saga.getState().pay();
  }

  public async checkPayment(): Promise<{ user: UserEntity }> {
    throw new Error(`Payment already cancel`);
  }

  public async cancel(): Promise<{ user: UserEntity }> {
    throw new Error(`Payment already cancel`);
  }
}
