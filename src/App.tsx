// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { ConfigProvider, App as AntdApp } from 'antd';
import GlobalContext from './utils/GlobalContext';

function App() {
  return (
    <ConfigProvider
      theme={{
        // borderRadius: 2
        token: { colorPrimary: '#1677FF' },
        components: {
          Layout: {
            triggerHeight: 32,
          },
        },
      }}
    >
      <AntdApp>
        <GlobalContext />
        <RouterProvider router={router}></RouterProvider>
      </AntdApp>
    </ConfigProvider>
  );
}

export default App;
