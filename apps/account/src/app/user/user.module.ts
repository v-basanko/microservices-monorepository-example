import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./models/user.model";
import { UserRepository } from "./repositories/user.repository";
import { UserCommands } from "./user.commands";
import { UserQueries } from "./user.queries";
import { ClientsModule } from '@nestjs/microservices';
import { QueueNames } from "@microservices-monorepository-example/enums";
import { getRmqClientConfig } from "@microservices-monorepository-example/configs";

@Module({
  imports: [
    MongooseModule.forFeature([{
    name: User.name,
    schema: UserSchema
  }]),
    ClientsModule.registerAsync(getRmqClientConfig(QueueNames.PAYMENT)),
  ],
  providers: [UserRepository],
  exports: [UserRepository],
  controllers: [UserCommands, UserQueries]
})
export class UserModule {}
