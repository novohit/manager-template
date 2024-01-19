// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { ConfigProvider } from 'antd';

function App() {
  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#1677FF' } }}>
      <RouterProvider router={router}></RouterProvider>
    </ConfigProvider>
  );
}

export default App;
