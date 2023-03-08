
export enum UserRole {
  Admin = 'Admin',
  Manager = 'Manager',
  Visitor = 'Visitor'
}

export interface IUser {
  _id?: string;
  displayName?: string;
  email: string;
  passwordHash: string;
  role: UserRole;
}
