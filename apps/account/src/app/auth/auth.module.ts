import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { getJWTConfig } from "@microservices-monorepository-example/configs";

@Module({
  imports: [ JwtModule.registerAsync(getJWTConfig()) ],
  controllers: [ AuthController ],
  providers: [ AuthService ],
})
export class AuthModule {}
