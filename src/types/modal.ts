export enum Operation {
  CREATE,
  UPDATE,
  DELETE,
}

export type ModalRef<T> = {
  open: (operation: Operation, data?: T) => void;
};
