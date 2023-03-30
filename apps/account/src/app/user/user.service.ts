import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from "../user/repositories/user.repository";
import { UserEntity } from "./entities/user.entity";
import { PublicProfile } from "@microservices-monorepository-example/types";
import { UserBooks } from "./models/user.model";
import { BuyBookSaga } from "./sagas/buy-book-saga/buy-book.saga";
import { PaymentStatuses, QueueNames } from "@microservices-monorepository-example/enums";
import { ClientProxy } from "@nestjs/microservices";

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    @Inject(QueueNames.PAYMENT) private paymentServiceProxyClient: ClientProxy
  ) {}

  async getUserInfo(id: string):Promise<PublicProfile> {
    const user = await this.userRepository.findUserById(id);
    const profile = new UserEntity(user).getPublicProfile();
    return profile;
  }

  async getUserBooks(id: string):Promise<Array<UserBooks>> {
    const user = await this.userRepository.findUserById(id);
    return user.books;
  }

  async buyBook(userId:string, bookId:string):Promise<string> {
    const existsUser = await this.userRepository.findUserById(userId);
    if(!existsUser) {
      throw new Error(`User don't exists`);
    }
    const userEntity = new UserEntity(existsUser);
    const saga = new BuyBookSaga(userEntity, bookId, this.paymentServiceProxyClient);
    const { user, paymentLink } = await saga.getState().pay();
    await this.userRepository.updateUser(user);
    return paymentLink;
  }

  async checkPayment(userId, bookId):Promise<PaymentStatuses> {
    const existsUser = await this.userRepository.findUserById(userId);
    if(!existsUser) {
      throw new Error(`User don't exists`);
    }
    const userEntity = new UserEntity(existsUser);
    const saga = new BuyBookSaga(userEntity, bookId, this.paymentServiceProxyClient);
    const { user, status } = await saga.getState().checkPayment();
    await this.userRepository.updateUser(user);
    return status
  }
}
