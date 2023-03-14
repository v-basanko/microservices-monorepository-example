import {Body, Controller, UsePipes, ValidationPipe} from '@nestjs/common';
import { AuthService } from "./auth.service";
import { AccountLogin, AccountRegister } from "@microservices-monorepository-example/contracts";
import { MessagePattern } from "@nestjs/microservices";

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @UsePipes(new ValidationPipe())
  @MessagePattern({topic: AccountRegister.topic})
  async register(@Body() dto: AccountRegister.Request):Promise<AccountRegister.Response> {
    return this.authService.register(dto);
  }

  @UsePipes(new ValidationPipe())
  @MessagePattern({topic: AccountLogin.topic})
  async login(@Body() {email, password}: AccountLogin.Request): Promise<AccountLogin.Response> {
    const {id} = await this.authService.validateUser(email, password);
    return this.authService.login(id)
  }
}
