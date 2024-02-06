import { Menu, MenuRouter } from '@/types/response/menu';
import { findMenuByPath, removePrefix } from '@/utils';
import { Tabs, theme } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useRouteLoaderData } from 'react-router-dom';

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

interface TabItem {
  key: string;
  label: React.ReactNode;
  closable: boolean;
}

const NavTabs: React.FC = () => {
  const homeItem: TabItem = { key: 'welcome', label: 'HOME', closable: false };
  const [activeKey, setActiveKey] = useState(homeItem.key);
  const [items, setItems] = useState<TabItem[]>([homeItem]);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { menus } = useRouteLoaderData('admin') as MenuRouter;

  useEffect(() => {
    const currentMenu = findMenuByPath(removePrefix(pathname, '/admin/'), menus);
    if (currentMenu) {
      addTab(currentMenu);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, menus]);

  const addTab = (menu: Menu) => {
    setActiveKey(menu.router);
    if (items.find(item => item.key === menu.router)) return;
    setItems([...items, { label: menu.menuName, key: menu.router, closable: true }]);
  };

  const handleChange = (activeKey: string) => {
    navigate(activeKey);
  };

  const removeTab = (targetKey: TargetKey) => {
    const targetIndex = items.findIndex(item => item.key === targetKey);
    const newItems = items.filter(item => item.key !== targetKey);
    if (newItems.length && targetKey === activeKey) {
      const { key } = newItems[targetIndex === newItems.length ? targetIndex - 1 : targetIndex];
      setActiveKey(key);
      navigate(key);
    }
    setItems(newItems);
  };

  return (
    <Tabs
      hideAdd
      activeKey={activeKey}
      tabBarStyle={{ height: 38, marginBottom: 0 }}
      onChange={handleChange}
      onEdit={removeTab}
      type="editable-card"
      items={items}
    />
  );
};

export default NavTabs;
