/* eslint-disable react-refresh/only-export-components */
import AdminLayout from '@/layouts/AdminLayout';
import Login from '@/pages/login/Login';
import Register from '@/pages/register/Register';
import AuthLoader from './AuthLoader';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import NotFound from '@/pages/NotFound';
import Forbidden from '@/pages/Forbidden';
import loadable from '@loadable/component';

export const HOME_PATH = '/';
export const LOGIN_PATH = '/login';
export const REGISTER_PATH = '/register';
export const ADMIN_PATH = '/admin';

const Welcome = loadable(() => import('@/pages/Welcome'));
const UserList = loadable(() => import('@/pages/system/user'));
const DeptList = loadable(() => import('@/pages/system/dept'));
const MenuList = loadable(() => import('@/pages/system/menu'));
const RoleList = loadable(() => import('@/pages/system/role'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="admin" replace={true} />,
  },
  {
    /* 绝对路径 / 开头 相对路径不能用 / */
    path: '/admin',
    id: 'admin',
    loader: AuthLoader,
    element: <AdminLayout />,
    children: [
      // replace 跳转后替换之前的历史记录
      { path: '', element: <Navigate to="welcome" replace={true} /> },
      { path: 'welcome', element: <Welcome /> },
      { path: 'user', element: <UserList /> },
      { path: 'dept', element: <DeptList /> },
      { path: 'menu', element: <MenuList /> },
      { path: 'role', element: <RoleList /> },
    ],
  },
  {
    path: LOGIN_PATH,
    element: <Login />,
  },
  {
    path: REGISTER_PATH,
    element: <Register />,
  },
  {
    path: '*',
    element: <Navigate to="/404" />,
  },
  {
    path: '/404',
    element: <NotFound />,
  },
  {
    path: '/403',
    element: <Forbidden />,
  },
]);

export default router;
