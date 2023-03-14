import {Body, Controller, UsePipes, ValidationPipe} from '@nestjs/common';
import {MessagePattern} from "@nestjs/microservices";
import {AccountUpdatePrifile} from "@microservices-monorepository-example/contracts";
import {UserRepository} from "./repositories/user.repository";
import {UserEntity} from "./entities/user.entity";

@Controller()
export class UserCommands {

  constructor(
    private readonly userRepository: UserRepository
  ) {}

  @UsePipes(new ValidationPipe())
  @MessagePattern({topic: AccountUpdatePrifile.topic})
  async getUserInfo(@Body() { id, user }: AccountUpdatePrifile.Request):Promise<AccountUpdatePrifile.Response> {
    const existsUser = await this.userRepository.findUserById(id);
    if(!existsUser) {
      throw new Error(`User isn't exists`)
    }
    const userEntity = new UserEntity(existsUser).updateProfile(user.displayName);
    await this.userRepository.updateUser(userEntity);
    return { user };
  }

}
