import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { ConfigModule } from "@nestjs/config";
import { getRMQConfig } from "./configs/rmq.config";
import { JwtModule } from "@nestjs/jwt";
import { getJWTConfig } from "./configs/jwt.config";
import { PassportModule } from "@nestjs/passport";
import { UserController } from "./controllers/user.controller";
import { ClientsModule } from '@nestjs/microservices';
import { JwtStrategy } from "./strategies/jwt.strategy";
import { QueueNames } from "@microservices-monorepository-example/enums";
import { BookController } from "./controllers/book.controller";


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'envs/.api.env',
      isGlobal: true
    }),
    ClientsModule.registerAsync(getRMQConfig(QueueNames.ACCOUNT)),
    ClientsModule.registerAsync(getRMQConfig(QueueNames.BOOK)),
    JwtModule.registerAsync(getJWTConfig()),
    PassportModule
  ],
  controllers: [AuthController, UserController, BookController],
  providers: [ JwtStrategy ],
})
export class AppModule {}
