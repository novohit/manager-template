import { Dept } from '@/types/response/dept';
import http from './http';
import { DeptCreateReq, DeptUpdateReq } from '@/types/request/dept';

export async function list() {
  const url = '/api/dept/list';
  const resp = (await http.get(url)) as Dept[];
  return resp;
}

export async function create(body: DeptCreateReq) {
  const url = '/api/dept';
  const resp = (await http.post(url, body)) as string;
  return resp;
}

export async function update(deptId: string, body: DeptUpdateReq) {
  const url = `/api/dept/${deptId}`;
  const resp = (await http.put(url, body)) as string;
  return resp;
}

export async function del(deptIds: React.Key[]) {
  const url = '/api/dept';
  const resp = (await http.delete(url, { data: deptIds })) as string;
  return resp;
}
