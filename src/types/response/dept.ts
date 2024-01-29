import { BaseModel } from '../base';

export interface Dept extends BaseModel {
  deptId: string;
  deptName: string;
  children: Dept[];
}
