import { BuyBookSagaState } from "./buy-book.state";
import { UserEntity } from "../../../entities/user.entity";


export class BuyBookSagaStateFinish extends BuyBookSagaState {
  public async pay(): Promise<{ paymentLink: string; user: UserEntity }> {
    throw new Error(`Payment already passed`);
  }

  public async checkPayment(): Promise<{ user: UserEntity }> {
    throw new Error(`Payment already passed`);
  }

  public async cancel(): Promise<{ user: UserEntity }> {
    throw new Error(`Payment already passed`);
  }
}
