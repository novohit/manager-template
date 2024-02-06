import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, theme } from 'antd';
import React from 'react';
import UserInfo from './UserInfo';
import styles from './index.module.scss';
import FullScreenButton from './FullScreenButton';
import ThemeSwitch from './ThemeSwitch';
import DynamicBreadcrumb from './DynamicBreadcrumb';

interface Props {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const NavHeader: React.FC<Props> = (props: Props) => {
  const { collapsed, setCollapsed } = props;
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <div className={styles.header} style={{ background: colorBgContainer }}>
      <div className={styles.left}>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: '16px',
            width: 50,
            height: 50,
          }}
        />
        <DynamicBreadcrumb />
      </div>
      <div className={styles.right}>
        <ThemeSwitch />
        <FullScreenButton />
        <UserInfo />
      </div>
    </div>
  );
};

export default NavHeader;
