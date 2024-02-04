import { BaseModel } from '../base';

export interface Role extends BaseModel {
  roleId: string;
  roleName: string;
  roleCode: string;
  menuIs: string[];
  state: boolean;
}
