import http from './http';
import { User } from '@/types/response/user';
import { UserCreateReq, UserLoginReq, UserPageReq, UserUpdateReq } from '@/types/request/user';
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

export async function create(body: UserCreateReq) {
  const url = '/api/user';
  const resp = (await http.post(url, body)) as string;
  return resp;
}

export async function update(userId: string, body: UserUpdateReq) {
  const url = `/api/user/${userId}`;
  const resp = (await http.put(url, body)) as string;
  return resp;
}

export async function del(userIds: React.Key[]) {
  const url = '/api/user';
  const resp = (await http.delete(url, { data: userIds })) as string;
  return resp;
}
