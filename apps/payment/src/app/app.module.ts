import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { getMongoConfig } from "@microservices-monorepository-example/configs";



@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true,  envFilePath: 'envs/.payment.env'}),
    MongooseModule.forRootAsync(getMongoConfig())
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
