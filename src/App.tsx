// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { ConfigProvider, App as AntdApp } from 'antd';
import GlobalContext from './utils/GlobalContext';

function App() {
  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#1677FF' } }}>
      <AntdApp>
        <GlobalContext />
        <RouterProvider router={router}></RouterProvider>
      </AntdApp>
    </ConfigProvider>
  );
}

export default App;
