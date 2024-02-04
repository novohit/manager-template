import React from 'react';
import { BaseModel } from '../base';

export interface Menu extends BaseModel {
  menuId: string;
  menuName: string;
  menuCode: string;
  parentId: string;
  type: string;
  icon: string;
  orderNum: number;
  component: string;
  router: string;
  state: string;
  children?: Menu[];
}

export interface RolePermission {
  menus: Menu[];
  checkedKeys: React.Key[];
}

export interface MenuRouter {
  menus: Menu[];
  router: string[];
}
