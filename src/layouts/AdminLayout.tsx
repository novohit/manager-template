import React, { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  HomeOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import * as Icons from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import { Outlet, useLoaderData } from 'react-router-dom';
import NavHeader from '../components/NavHeader';
import styles from './AdminLayout.module.scss';
import { Menu as IMenu, MenuRouter } from '@/types/response/menu';

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
  getItem('Home', '2', <HomeOutlined />),
  getItem('Option 1', '1', <PieChartOutlined />),
  getItem('Option 3', '3', <DesktopOutlined />),
  getItem('User', 'sub1', <UserOutlined />, [getItem('Tom', '7'), getItem('Bill', '4'), getItem('Alex', '5')]),
  getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('Files', '9', <FileOutlined />),
];

const convertAntdItems = (menus: IMenu[] = []) => {
  if (menus.length === 0) return;
  const antdItems: MenuItem[] = [];
  menus.forEach(menu => {
    antdItems.push(getItem(menu.menuName, menu.id, convertIcon(menu.icon), convertAntdItems(menu.children)));
  });
  return antdItems;
};

// TODO 优化全量引入
const convertIcon = (name?: string) => {
  if (!name) return;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const antdIcons: { [key: string]: any } = Icons;
  if (!antdIcons[name]) return;
  return React.createElement(antdIcons[name]);
};

const AdminLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { menus } = useLoaderData() as MenuRouter;
  const antdItems = convertAntdItems(menus);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* 左侧栏 */}
      <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
        <div style={{ height: '32px', margin: '16px', background: 'gray' }}></div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={antdItems} />
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

export default AdminLayout;
