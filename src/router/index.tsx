import Welcome from '@/pages/Welcome';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Welcome />,
  },
]);

export default router;

export const HOME_PATH = '/';
