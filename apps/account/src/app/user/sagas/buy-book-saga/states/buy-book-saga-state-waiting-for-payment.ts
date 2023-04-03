import { BuyBookSagaState } from "./buy-book.state";
import { UserEntity } from "../../../entities/user.entity";
import { PaymentCheck } from "@microservices-monorepository-example/contracts";
import { firstValueFrom } from 'rxjs';
import { PurchaseState } from "@microservices-monorepository-example/interfaces";
import { PaymentStatus } from "@microservices-monorepository-example/enums";

export class BuyBookSagaStateWaitingForPayment extends BuyBookSagaState {
  public async pay(): Promise<{ paymentLink: string; user: UserEntity }> {
    throw new Error(`Payment is already created`);
  }

  public async checkPayment(): Promise<{ user: UserEntity, status: PaymentStatus }> {
    const { status }:PaymentCheck.Response = await firstValueFrom<PaymentCheck.Response>(this.saga.rmqClient.send({ topic: PaymentCheck.topic },{ id: this.saga.paymentId }));
    switch (status) {
      case PaymentStatus.CANCELED:
        this.saga.setState(PurchaseState.Canceled);
        break;
      case PaymentStatus.SUCCESS:
        this.saga.setState(PurchaseState.Purchased)
        break;
      default: break;
    }
    return { user: this.saga.user, status };
  }

  public async cancel(): Promise<{ user: UserEntity }> {
    throw new Error(`Can't cancel a payment that's already in progress`);
  }
}
