import AdminLayout from '@/layouts/AdminLayout';
import Login from '@/pages/login/Login';
import Register from '@/pages/register/Register';
import UserList from '@/pages/system/user';
import DeptList from '@/pages/system/dept';
import MenuList from '@/pages/system/menu';
import Welcome from '@/pages/Welcome';
import AuthLoader from './AuthLoader';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import NotFound from '@/pages/NotFound';
import Forbidden from '@/pages/Forbidden';

export const HOME_PATH = '/';
export const LOGIN_PATH = '/login';
export const REGISTER_PATH = '/register';
export const ADMIN_PATH = '/admin';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Welcome />,
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
