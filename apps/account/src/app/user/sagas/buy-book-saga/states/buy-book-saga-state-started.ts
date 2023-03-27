import { BuyBookSagaState } from "./buy-book.state";
import { UserEntity } from "../../../entities/user.entity";
import { BookGetBook, PaymentGenerateLink } from "@microservices-monorepository-example/contracts";
import { firstValueFrom } from 'rxjs';
import { PurchaseState } from "@microservices-monorepository-example/interfaces";
import { PaymentStatuses } from "@microservices-monorepository-example/enums";

export class BuyBookSagaStateStarted extends BuyBookSagaState {
  public async pay(): Promise<{ paymentLink: string; paymentId: string, user: UserEntity }> {
    const { book } = await firstValueFrom<BookGetBook.Response>(this.saga.rmqClient.send({topic: BookGetBook.topic}, {
      id: this.saga.bookId
    }));
    if(!book) {
      throw new Error( `Book isn't exists`);
    }
    if(book.price === 0) {
      this.saga.setState(PurchaseState.Purchased)
      return {
        paymentLink: null,
        paymentId: null,
        user: this.saga.user
      }
    }
    const { paymentLink, id } = await firstValueFrom<PaymentGenerateLink.Response>(this.saga.rmqClient.send({topic: PaymentGenerateLink.topic}, {
      bookId: book._id,
      userId: this.saga.user._id,
      sum: book.price
    }));
    this.saga.setState(PurchaseState.WaitingForPayment)
    return {
      paymentLink: paymentLink,
      paymentId: id,
      user: this.saga.user
    }
  }

  public checkPayment():  Promise<{ user: UserEntity, status: PaymentStatuses }> {
    throw new Error(`Payment doesn't started yet`);
  }

  public async cancel(): Promise<{ user: UserEntity }> {
    this.saga.setState(PurchaseState.Canceled);
    return {
      user: this.saga.user
    };
  }
}
