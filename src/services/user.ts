import { User, UserLoginReq } from '@/types/request/user';
import http from './http';

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
