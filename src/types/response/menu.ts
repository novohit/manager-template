import { BaseModel } from '../base';

export interface Menu extends BaseModel {
  id: string;
  menuName: string;
  menuCode: string;
  parentId: string;
  type: string;
  icon: string;
  orderNum: number;
  component: string;
  router: string;
  state: string;
  children: Menu[];
}
