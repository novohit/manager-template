import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
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

  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <Space>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <DynamicBreadcrumb />
        </Space>
      </div>
      <div className={styles.right}>
        <Space>
          <ThemeSwitch />
          <FullScreenButton />
          <UserInfo />
        </Space>
      </div>
    </div>
  );
};

export default NavHeader;
