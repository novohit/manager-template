import React, { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  HomeOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import NavHeader from '../components/NavHeader';
import styles from './MangerLayout.module.scss';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Home', '1', <HomeOutlined />),
  getItem('Option 1', '2', <PieChartOutlined />),
  getItem('Option 3', '3', <DesktopOutlined />),
  getItem('User', 'sub1', <UserOutlined />, [getItem('Tom', '7'), getItem('Bill', '4'), getItem('Alex', '5')]),
  getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('Files', '9', <FileOutlined />),
];

const ManagerLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // 暂时放在 UserInfo 组件中加载
  // useLoadUserInfo();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* 左侧栏 */}
      <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
        <div style={{ height: '32px', margin: '16px', background: 'red' }} />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      {/* 右侧区域 */}
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <NavHeader collapsed={collapsed} setCollapsed={setCollapsed} />
        </Header>
        {/* <Content className={styles.content} style={{ background: colorBgContainer, borderRadius: borderRadiusLG }}> */}
        <Content className={styles.content} style={{ borderRadius: borderRadiusLG }}>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: 'center', padding: 0, background: colorBgContainer, lineHeight: '32px' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default ManagerLayout;
