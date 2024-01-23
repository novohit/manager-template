import { BaseModel } from '../base';

export interface User extends BaseModel {
  userId: string;
  username: string;
  password: string;
  age: number;
  email: string;
  avatar: string;
}
