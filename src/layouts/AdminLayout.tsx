import React, { useState } from 'react';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import { Link, Navigate, Outlet, useLoaderData, useLocation } from 'react-router-dom';
import NavHeader from '../components/NavHeader';
import styles from './AdminLayout.module.scss';
import { Menu as IMenu, MenuRouter } from '@/types/response/menu';
import Icon from '@/components/Icon';
import trimEnd from 'lodash.trimend';

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

const convertAntdItems = (menus: IMenu[] = []) => {
  if (menus.length === 0) return;
  const items: MenuItem[] = [];
  menus.forEach(menu => {
    items.push(
      getItem(
        menu.router ? <Link to={menu.router}>{menu.menuName}</Link> : <>{menu.menuName}</>,
        menu.menuId,
        <Icon type={menu.icon} />,
        convertAntdItems(menu.children)
      )
    );
  });
  return items;
};

const AdminLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { pathname } = useLocation();
  const { menus, router } = useLoaderData() as MenuRouter;

  console.log(pathname);
  // 路由鉴权
  if (!router.includes(trimEnd(pathname, '/'))) return <Navigate to="/403" />;

  const items = convertAntdItems(menus);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* 左侧栏 */}
      <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
        <div style={{ height: '32px', margin: '16px', background: 'gray' }}></div>
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
          React-Admin ©{new Date().getFullYear()} Created by novo
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
