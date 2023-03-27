import { Body, Controller, Inject, Post, UnauthorizedException } from '@nestjs/common';
import { AccountLogin, AccountRegister } from "@microservices-monorepository-example/contracts";
import { LoginDto } from "../dtos/login.dto";
import { RegisterDto } from "../dtos/register.dto";
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from "rxjs";
import { QueueNames } from "@microservices-monorepository-example/enums";

@Controller('auth')
export class AuthController {
  constructor(@Inject(QueueNames.ACCOUNT) private client: ClientProxy) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    try{
      return await firstValueFrom<AccountRegister.Response>(this.client.send({ topic: AccountRegister.topic }, dto));
    } catch (ex) {
      if(ex instanceof Error) {
        throw new UnauthorizedException(ex.message);
      }
    }
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    try{
      return await firstValueFrom<AccountLogin.Response>(this.client.send({ topic: AccountLogin.topic } , dto))
    } catch (ex) {
      console.log(ex)
      if(ex instanceof Error) {
        throw new UnauthorizedException(ex.message);
      }
    }
  }
}
