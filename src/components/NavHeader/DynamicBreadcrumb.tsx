import { Menu, MenuRouter } from '@/types/response/menu';
import { Breadcrumb } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useRouteLoaderData } from 'react-router-dom';
import { removePrefix } from '@/utils';
import { HomeOutlined } from '@ant-design/icons';

function convertBreadcrumbItems(menus: Menu[], pathname: string) {
  // 查找树的路径
  const res: { menuName: React.ReactNode; router: string }[] = [];
  function findBreadcrumbPath(menus: Menu[], pathname: string) {
    for (const { menuName, router, children } of menus) {
      if (router === pathname) {
        res.push({ menuName, router });
        return true;
      }
      if (children) {
        const found = findBreadcrumbPath(children, pathname);
        if (found) {
          res.push({ menuName, router });
          return true;
        }
      }
    }
    return false;
  }
  findBreadcrumbPath(menus, pathname);
  res.push({ menuName: <HomeOutlined />, router: 'welcome' }); // HOME 首页

  return res.reverse();
}

const DynamicBreadcrumb: React.FC = () => {
  const { pathname } = useLocation();
  const [breadcrumbItems, setBreadcrumbItems] = useState<{ menuName: React.ReactNode; router: string }[]>([]);
  const { menus } = useRouteLoaderData('admin') as MenuRouter;

  useEffect(() => {
    const items = convertBreadcrumbItems(menus, removePrefix(pathname, '/admin/'));
    setBreadcrumbItems(items);
  }, [pathname, menus]);
  return (
    <Breadcrumb
      style={{ margin: '16px 0' }}
      items={breadcrumbItems.map(item => {
        return { title: <Link to={item.router}>{item.menuName}</Link> };
      })}
    />
  );
};

export default DynamicBreadcrumb;
