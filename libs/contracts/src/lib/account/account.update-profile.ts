import { IsString } from 'class-validator';
import { UpdateProfileType } from "@microservices-monorepository-example/types";

export namespace AccountUpdateProfile {

  export const topic = 'account.update-profile.command';

  export class Request {

    @IsString()
    id: string;

    @IsString()
    user: UpdateProfileType;

  }

  export class Response {}
}
