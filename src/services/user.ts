import http from './http';
import { User } from '@/types/response/user';
import { UserLoginReq, UserPageReq } from '@/types/request/user';
import { PageResponse } from '@/types/base';

export async function getUserInfo() {
  const url = '/api/user/info';
  const user = (await http.get(url)) as User;
  return user;
}

export async function register(body: Partial<User>) {
  const url = '/api/user/register';
  const userId = (await http.post(url, body)) as string;
  return userId;
}

export async function login(body: UserLoginReq) {
  const url = '/api/user/login';
  const token = (await http.post(url, body)) as string;
  return token;
}

export async function getUserList(body: Partial<UserPageReq>) {
  const url = '/api/user/list';
  const resp = (await http.post(url, body)) as PageResponse<User>;
  return resp;
}
