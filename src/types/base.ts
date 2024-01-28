export interface BaseModel {
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface PageResponse<T> {
  list: Array<T>;
  total: number;
}

// request ========================

export interface PageOption {
  page: number;
  size: number;
}
