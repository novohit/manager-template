import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { StyleProvider } from '@ant-design/cssinjs';

// antd样式会与tailwindcss样式冲突 https://github.com/ant-design/ant-design/issues/45560
ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <StyleProvider hashPriority="high">
    <App />
  </StyleProvider>
  // </React.StrictMode>
);
