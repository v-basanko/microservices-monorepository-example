import { Body, Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { MessagePattern } from "@nestjs/microservices";
import { AccountUserBooks, AccountUserInfo } from "@microservices-monorepository-example/contracts";
import {UserRepository} from "./repositories/user.repository";
import {UserEntity} from "./entities/user.entity";

@Controller()
export class UserQueries {

  constructor(
    private readonly userRepository: UserRepository
  ) {}

  @UsePipes(new ValidationPipe())
  @MessagePattern({topic: AccountUserInfo.topic})
  async getUserInfo(@Body() { id }: AccountUserInfo.Request):Promise<AccountUserInfo.Response> {
    const user = await this.userRepository.findUserById(id);
    const profile = new UserEntity(user).getPublicProfile();
    return { profile };
  }

  @UsePipes(new ValidationPipe())
  @MessagePattern({topic: AccountUserBooks.topic})
  async getUserBooks(@Body() { id }: AccountUserBooks.Request):Promise<AccountUserBooks.Response> {
    const user = await this.userRepository.findUserById(id);
    return {
      books: user.books
    };
  }

}
