import { IsString } from 'class-validator';
import { IUser } from "@microservices-monorepository-example/interfaces";

export namespace AccountUpdatePrifile {

  export const topic = 'account.update-profile.command';

  export class Request {

    @IsString()
    id: string;

    @IsString()
    user: Pick<IUser, 'displayName'>;

  }

  export class Response {}
}
