import { Menu } from '@/types/response/menu';

export function removePrefix(str: string, prefix: string) {
  if (str.startsWith(prefix)) {
    return str.replace(prefix, '');
  }
  return str;
}

export function findMenuByPath(pathname: string, menus: Menu[]): Menu | undefined {
  for (const menu of menus) {
    if (menu.router === pathname) return menu;
    if (menu.children) {
      const res = findMenuByPath(pathname, menu.children);
      if (res) return res;
    }
  }
  return;
}
