import { UserEntity } from "../entities/user.entity";
import { ClientProxy } from "@nestjs/microservices";
import { PurchaseState } from "@microservices-monorepository-example/interfaces";
import { BuyBookSagaState } from "./buy-book.state";
import {BuyBookSagaStateStarted } from "./buy-book.steps";

export class BuyBookSaga {
  private state: BuyBookSagaState;

  constructor(
    public  user: UserEntity,
    public  bookId: string,
    public rmqClient: ClientProxy) {}

  setState(state: PurchaseState) {
    switch (state) {
      case PurchaseState.Started:
        this.state = new BuyBookSagaStateStarted();
        break;
      case PurchaseState.WaitingForPayment: break;
      case PurchaseState.Purchased: break;
      case PurchaseState.Canceled: break;
      default: break;
    }
    this.state.setContext(this);
    this.user.updateBookStatus(this.bookId, state);
  }

  getState() {
    return this.state;
  }
}
