import Login from '@/pages/login/Login';
import Welcome from '@/pages/Welcome';
import { createBrowserRouter } from 'react-router-dom';

export const HOME_PATH = '/';
export const LOGIN_PATH = '/login';
export const REGISTER_PATH = '/register';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Welcome />,
  },
  {
    path: LOGIN_PATH,
    element: <Login />,
  },
]);

export default router;
