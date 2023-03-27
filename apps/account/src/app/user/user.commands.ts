import { Body, Controller, Inject, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserRepository } from "./repositories/user.repository";
import { ClientProxy, MessagePattern} from "@nestjs/microservices";
import { AccountBuyBook, AccountCheckPayment } from "@microservices-monorepository-example/contracts";
import { UserEntity } from "./entities/user.entity";
import { BuyBookSaga } from "./sagas/buy-book-saga/buy-book.saga";
import { QueueNames } from "@microservices-monorepository-example/enums";


@Controller()
export class UserCommands {

  constructor(
    private readonly userRepository: UserRepository,
    @Inject(QueueNames.PAYMENT) private client: ClientProxy

  ) {}

  @UsePipes(new ValidationPipe())
  @MessagePattern({topic: AccountBuyBook.topic})
  async buyBook(@Body() { userId, bookId }: AccountBuyBook.Request):Promise<AccountBuyBook.Response> {
    const existsUser = await this.userRepository.findUserById(userId);
    if(!existsUser) {
      throw new Error(`User don't exists`);
    }
    const userEntity = new UserEntity(existsUser);
    const saga = new BuyBookSaga(userEntity, bookId, this.client);
    const { user, paymentLink } = await saga.getState().pay();
    await this.userRepository.updateUser(user);
    return { paymentLink }
  }

  @UsePipes(new ValidationPipe())
  @MessagePattern({topic: AccountCheckPayment.topic})
  async checkPayment(@Body() { userId, bookId }: AccountCheckPayment.Request):Promise<AccountCheckPayment.Response> {
    const existsUser = await this.userRepository.findUserById(userId);
    if(!existsUser) {
      throw new Error(`User don't exists`);
    }
    const userEntity = new UserEntity(existsUser);
    const saga = new BuyBookSaga(userEntity, bookId, this.client);
    const { user, status } = await saga.getState().checkPayment();
    await this.userRepository.updateUser(user);
    return { status }
  }

}
