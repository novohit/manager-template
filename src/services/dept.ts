import { Dept } from '@/types/response/dept';
import http from './http';

export async function list() {
  const url = '/api/dept/list';
  const resp = (await http.get(url)) as Dept[];
  return resp;
}
