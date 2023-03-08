import {BadRequestException, ForbiddenException, Injectable, UnauthorizedException} from '@nestjs/common';
import {RegisterDto} from "./auth.controller";
import {UserRepository} from "../user/repositories/user.repository";
import {UserEntity} from "../user/entities/user.entity";
import {UserRole} from "@microservices-monorepository-example/interfaces";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService
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
      passwordHash: '',
      role: UserRole.Visitor
    }).setPassword(password);
    const newUser = await this.userRepository.createUser(userEntity);
    return {
      email: newUser.email
    }
  }

  async validateUser(email: string, password:string) {
    const user = await this.userRepository.findUser(email);
    if(!user) {
      throw new UnauthorizedException('Unknown login or password');
    }
    const userEntity = new UserEntity(user);
    const isCorrectPassword = await userEntity.validatePassword(password);
    if(!isCorrectPassword) {
      throw new UnauthorizedException('Unknown login or password');
    } else {
      return {
        id: user._id
      }
    }
  }

  async login(id: string) {
    return {
      access_token: await this.jwtService.signAsync({ id })
    }
  }
}
