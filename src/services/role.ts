import http from './http';
import { Role } from '@/types/response/role';
import { RoleCreateReq, RoleUpdateReq } from '@/types/request/role';

export async function list() {
  const url = '/api/role/list';
  const resp = (await http.get(url)) as Role[];
  return resp;
}

export async function create(body: RoleCreateReq) {
  const url = '/api/role';
  const resp = (await http.post(url, body)) as string;
  return resp;
}

export async function update(roleId: string, body: RoleUpdateReq) {
  const url = `/api/role/${roleId}`;
  const resp = (await http.put(url, body)) as string;
  return resp;
}

export async function del(roleIds: React.Key[]) {
  const url = '/api/role';
  const resp = (await http.delete(url, { data: roleIds })) as string;
  return resp;
}
