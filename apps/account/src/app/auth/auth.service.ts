import {BadRequestException, Injectable} from '@nestjs/common';
import {RegisterDto} from "./auth.controller";
import {UserRepository} from "../user/repositories/user.repository";
import {UserEntity} from "../user/entities/user.entity";
import {UserRole} from "@microservices-monorepository-example/interfaces";

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository
  ) {

  }


  async register({ email, password, displayName }: RegisterDto) {
    const existsUser = await this.userRepository.findUser(email);
    if(existsUser) {
      throw new BadRequestException('User already exists')
    }
    const userEntity = await new UserEntity({
      email,
      displayName,
      role: UserRole.Visitor
    }).setPassword(password);
    const newUser = await this.userRepository.createUser(userEntity);
    return {
      email: newUser.email
    }
  }
}
