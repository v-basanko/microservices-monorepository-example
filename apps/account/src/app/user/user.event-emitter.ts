import { Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import {UserEntity} from "./entities/user.entity";

@Injectable()
export class UserEventEmitter {
  constructor(private readonly rmqService: ClientProxy) {}

  async handle(user: UserEntity): Promise<void> {
    for(const event of user.events) {
      await this.rmqService.emit(event.topic, event.data);
    }
  }
}
