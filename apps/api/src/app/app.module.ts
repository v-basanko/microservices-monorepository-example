import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { ConfigModule } from "@nestjs/config";
import { getRMQConfig } from "./configs/rmq.config";
import { JwtModule } from "@nestjs/jwt";
import { getJWTConfig } from "./configs/jwt.config";
import { PassportModule } from "@nestjs/passport";
import { UserController } from "./controllers/user.controller";
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'envs/.api.env',
      isGlobal: true
    }),
    ClientsModule.registerAsync(getRMQConfig()),
    JwtModule.registerAsync(getJWTConfig()),
    PassportModule
  ],
  controllers: [AuthController, UserController],
  providers: [],
})
export class AppModule {}
