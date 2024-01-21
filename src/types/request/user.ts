export interface User {
  userId: string;
  username: string;
  password: string;
  age: number;
  email: string;
}

export interface UserRegisterReq {
  username: string;
  password: string;
  rePassword: string;
}

export interface UserLoginReq {
  username: string;
  password: string;
}
