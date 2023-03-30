import {IUser} from "@microservices-monorepository-example/interfaces";

export type PublicProfile = Omit<IUser, 'passwordHash'>;
