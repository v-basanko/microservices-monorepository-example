import { BuyBookSagaState } from "./buy-book.state";
import { UserEntity } from "../../../entities/user.entity";
import { PaymentStatuses } from "@microservices-monorepository-example/enums";


export class BuyBookSagaStatePurchased extends BuyBookSagaState {
  public async pay(): Promise<{ paymentLink: string; user: UserEntity }> {
    throw new Error(`Payment already passed`);
  }

  public async checkPayment(): Promise<{ user: UserEntity, status: PaymentStatuses }> {
    throw new Error(`Payment already passed`);
  }

  public async cancel(): Promise<{ user: UserEntity }> {
    throw new Error(`Payment already passed`);
  }
}
