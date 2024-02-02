import { getToken } from '@/utils/token';
import { redirect } from 'react-router-dom';
import { LOGIN_PATH } from '.';
import { menuRouter } from '@/services/menu';

export default async function AuthLoader() {
  const token = getToken();
  if (!token) return redirect(LOGIN_PATH);
  const { menus, router } = await menuRouter();
  return { menus, router };
}
