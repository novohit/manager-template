import { PageOption } from '../base';
import { User } from '../response/user';

export interface UserRegisterReq {
  username: string;
  password: string;
  rePassword: string;
}

export interface UserLoginReq {
  username: string;
  password: string;
  remember: boolean;
}

export interface UserPageReq extends User, PageOption {}

export interface UserCreateReq {
  username: string;
  password: string;
  email: string;
  phone: string;
}

export interface UserUpdateReq {
  username: string;
  password: string;
  email: string;
  phone: string;
}
