import { Avatar, Dropdown, MenuProps } from 'antd';
import React from 'react';
import avatar from '@/assets/login-bg.png';
import { useNavigate } from 'react-router-dom';
import { LOGIN_PATH } from '@/router';
import { clearToken } from '@/utils/token';
import useLoadUserInfo from '@/hooks/useLoadUserInfo';
import useUserStore from '@/store/userStore';

const UserInfo: React.FC = () => {
  const navigate = useNavigate();

  const logout = () => {
    clearToken();
    navigate(LOGIN_PATH);
  };

  useLoadUserInfo();

  const user = useUserStore(state => state.user);

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
      label: '退出登录',
      key: '2',
      onClick: logout,
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

  return (
    <>
      {user?.username}&nbsp;&nbsp;
      <Dropdown menu={{ items }} arrow>
        <Avatar size="large" src={user?.avatar || avatar} />
      </Dropdown>
    </>
  );
};

export default UserInfo;
