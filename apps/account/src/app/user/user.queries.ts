import { Body, Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { MessagePattern } from "@nestjs/microservices";
import { AccountUserBooks, AccountUserInfo } from "@microservices-monorepository-example/contracts";
import { UserService } from "./user.service";

@Controller()
export class UserQueries {

  constructor(
    private readonly userService: UserService
  ) {}

  @UsePipes(new ValidationPipe())
  @MessagePattern({topic: AccountUserInfo.topic})
  async getUserInfo(@Body() { id }: AccountUserInfo.Request):Promise<AccountUserInfo.Response> {
    const profile = await this.userService.getUserInfo(id);
    return { profile };
  }

  @UsePipes(new ValidationPipe())
  @MessagePattern({topic: AccountUserBooks.topic})
  async getUserBooks(@Body() { id }: AccountUserBooks.Request):Promise<AccountUserBooks.Response> {
    const books = await this.userService.getUserBooks(id);
    return { books };
  }

}
