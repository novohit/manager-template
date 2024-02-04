import { Menu, MenuRouter, RolePermission } from '@/types/response/menu';
import http from './http';
import { MenuCreateReq, MenuUpdateReq } from '@/types/request/menu';

export async function list() {
  const url = '/api/menu/list';
  const resp = (await http.get(url)) as Menu[];
  return resp;
}

export async function rolePermission(roleId: string) {
  const url = `/api/menu/role-permission/${roleId}`;
  const resp = (await http.get(url)) as RolePermission;
  return resp;
}

export async function menuRouter() {
  const url = '/api/menu/router';
  const resp = (await http.get(url)) as MenuRouter;
  return resp;
}

export async function create(body: MenuCreateReq) {
  const url = '/api/menu';
  const resp = (await http.post(url, body)) as string;
  return resp;
}

export async function update(menuId: string, body: MenuUpdateReq) {
  const url = `/api/menu/${menuId}`;
  const resp = (await http.put(url, body)) as string;
  return resp;
}

export async function del(menuIds: React.Key[]) {
  const url = '/api/menu';
  const resp = (await http.delete(url, { data: menuIds })) as string;
  return resp;
}
