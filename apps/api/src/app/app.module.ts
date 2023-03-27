import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UserController } from "./controllers/user.controller";
import { ClientsModule } from '@nestjs/microservices';
import { JwtStrategy } from "./strategies/jwt.strategy";
import { QueueNames } from "@microservices-monorepository-example/enums";
import { BookController } from "./controllers/book.controller";
import { getJWTConfig, getRmqClientConfig } from "@microservices-monorepository-example/configs";


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'envs/.api.env',
      isGlobal: true
    }),
    ClientsModule.registerAsync(getRmqClientConfig(QueueNames.ACCOUNT)),
    ClientsModule.registerAsync(getRmqClientConfig(QueueNames.PAYMENT)),
    ClientsModule.registerAsync(getRmqClientConfig(QueueNames.BOOK)),
    JwtModule.registerAsync(getJWTConfig()),
    PassportModule
  ],
  controllers: [AuthController, UserController, BookController],
  providers: [ JwtStrategy ],
})
export class AppModule {}
