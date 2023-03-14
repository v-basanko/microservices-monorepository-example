import { UserEntity } from "../entities/user.entity";
import { Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { PurchaseState } from "@microservices-monorepository-example/interfaces";
import { GetBookSagaState } from "./get-book.state";

export class GetBookSaga {
  private state: GetBookSagaState;

  constructor(
    private  user: UserEntity,
    private  bookId: string,
    @Inject('amqp-transport-service') private client: ClientProxy) {}

  setState(state: PurchaseState) {
    switch (state) {
      case PurchaseState.Started: break;
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
