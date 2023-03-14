import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./models/user.model";
import { UserRepository } from "./repositories/user.repository";
import { UserCommands } from "./user.commands";
import { UserQueries } from "./user.queries";
import { ClientsModule } from '@nestjs/microservices';
import { getClientRMQConfig } from "../configs/rmq.config";

@Module({
  imports: [
    MongooseModule.forFeature([{
    name: User.name,
    schema: UserSchema
  }]),
    ClientsModule.registerAsync(getClientRMQConfig()),
  ],
  providers: [UserRepository],
  exports: [UserRepository],
  controllers: [UserCommands, UserQueries]
})
export class UserModule {}
