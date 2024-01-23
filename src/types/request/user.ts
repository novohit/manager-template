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
