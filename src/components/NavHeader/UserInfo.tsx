import { Avatar, Dropdown, MenuProps } from 'antd';
import React from 'react';
import avatar from '@/assets/login-bg.png';

const items: MenuProps['items'] = [
  {
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        个人信息
      </a>
    ),
    key: '0',
  },
  {
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        修改密码
      </a>
    ),
    key: '1',
  },
  {
    type: 'divider',
  },
  {
    label: '系统设置',
    key: '3',
    disabled: true,
  },
];

const UserInfo: React.FC = () => {
  return (
    <>
      <Dropdown menu={{ items }} arrow>
        <Avatar size="large" src={avatar} />
      </Dropdown>
    </>
  );
};

export default UserInfo;
