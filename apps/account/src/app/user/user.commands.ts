import { Body, Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { MessagePattern } from "@nestjs/microservices";
import { AccountBuyBook, AccountCheckPayment } from "@microservices-monorepository-example/contracts";
import { UserService } from "./user.service";


@Controller()
export class UserCommands {

  constructor(private readonly userService: UserService) {}

  @UsePipes(new ValidationPipe())
  @MessagePattern({topic: AccountBuyBook.topic})
  async buyBook(@Body() { userId, bookId }: AccountBuyBook.Request):Promise<AccountBuyBook.Response> {
    const paymentLink = await this.userService.buyBook(userId, bookId);
    return { paymentLink }
  }

  @UsePipes(new ValidationPipe())
  @MessagePattern({topic: AccountCheckPayment.topic})
  async checkPayment(@Body() { userId, bookId }: AccountCheckPayment.Request):Promise<AccountCheckPayment.Response> {
    const status = await this.userService.checkPayment(userId, bookId);
    return { status }
  }

}
