import { Controller, Get, Inject, UnauthorizedException, UseGuards } from '@nestjs/common';
import { JWTAuthGuard } from "../guards/jwt.guard";
import { UserId } from "../decorators/user.decorator";
import { ClientProxy } from "@nestjs/microservices";
import { AccountUserInfo } from "@microservices-monorepository-example/contracts";
import { firstValueFrom } from "rxjs";
import { QueueNames } from "@microservices-monorepository-example/enums";

@Controller('user')
export class UserController {
  constructor(@Inject(QueueNames.ACCOUNT) private accountRMQService: ClientProxy) {}

  @UseGuards(JWTAuthGuard)
  @Get('info')
  async getUserInfo(@UserId() userId: string) {
      try{
        return await firstValueFrom<AccountUserInfo.Response>(this.accountRMQService.send({ topic: AccountUserInfo.topic }, { id: userId }));
      } catch (ex) {
        if(ex instanceof Error) {
          throw new UnauthorizedException(ex.message);
        }
      }
    }
}
