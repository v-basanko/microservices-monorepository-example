import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from "../user/repositories/user.repository";
import { UserEntity } from "./entities/user.entity";
import { PublicProfile, UpdateProfileType } from "@microservices-monorepository-example/types";
import { UserBooks } from "./models/user.model";
import { BuyBookSaga } from "./sagas/buy-book-saga/buy-book.saga";
import { PaymentStatus, QueueNames } from "@microservices-monorepository-example/enums";
import { ClientProxy } from "@nestjs/microservices";
import { UserEventEmitter } from "./user.event-emitter";

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userEventEmitter: UserEventEmitter,
    @Inject(QueueNames.PAYMENT) private paymentRMQService: ClientProxy
  ) {}

  async updateProfile(user: UpdateProfileType, id: string) {
    const existsUser = await this.userRepository.findUserById(id);
    if(!existsUser) {
      throw new Error(`User don't exists`);
    }
    const userEntity = new UserEntity(existsUser).updateProfile(user);
    await this.updateUser(userEntity);
    return {};
  }

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
    const saga = new BuyBookSaga(userEntity, bookId, this.paymentRMQService);
    const { user, paymentLink } = await saga.getState().pay();
    await this.updateUser(user);
    return paymentLink;
  }

  async checkPayment(userId, bookId):Promise<PaymentStatus> {
    const existsUser = await this.userRepository.findUserById(userId);
    if(!existsUser) {
      throw new Error(`User don't exists`);
    }
    const userEntity = new UserEntity(existsUser);
    const saga = new BuyBookSaga(userEntity, bookId, this.paymentRMQService);
    const { user, status } = await saga.getState().checkPayment();
    await this.updateUser(user);
    return status
  }

  private updateUser(user: UserEntity) {
    return Promise.all([
      this.userEventEmitter.handle(user),
      this.userRepository.updateUser(user),
    ])
  }
}
