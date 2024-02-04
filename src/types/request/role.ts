export interface RoleCreateReq {
  roleName: string;
  roleCode: string;
  menuIds: string[];
  state: boolean;
}

export interface RoleUpdateReq {
  roleName: string;
  roleCode: string;
  menuIds: string[];
  state: boolean;
}
