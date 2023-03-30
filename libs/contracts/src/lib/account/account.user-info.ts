import { IsString } from 'class-validator';
import { PublicProfile } from "@microservices-monorepository-example/types";

export namespace AccountUserInfo {

  export const topic = 'account.user-info.query';

  export class Request {

    @IsString()
    id: string;

  }

  export class Response {
    profile: PublicProfile;
  }
}
