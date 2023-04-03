import { IUser } from "@microservices-monorepository-example/interfaces";

export type UpdateProfileType = Pick<IUser, 'displayName'>;
