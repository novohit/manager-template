import { Switch } from 'antd';
import React from 'react';

const ThemeSwitch: React.FC = () => {
  return (
    <>
      <Switch checkedChildren="暗黑" unCheckedChildren="默认" defaultChecked />
    </>
  );
};

export default ThemeSwitch;
