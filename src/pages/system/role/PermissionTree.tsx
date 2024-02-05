import React, { useEffect, useState } from 'react';
import { Form, Tree } from 'antd';
import type { TreeDataNode } from 'antd';
import { list, rolePermission } from '@/services/menu';
import { Menu } from '@/types/response/menu';
import { Operation } from '@/types/modal';

const convertToTreeData = (menus: Menu[] = []) => {
  if (menus.length === 0) return [];
  const treeData: TreeDataNode[] = [];
  menus.forEach(menu => {
    treeData.push({ title: menu.menuName, key: menu.menuId, children: convertToTreeData(menu.children) });
  });
  return treeData;
};

const PermissionTree: React.FC = () => {
  const [treeData, setTreeData] = useState<TreeDataNode[]>([]);
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>();
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>();
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);
  const form = Form.useFormInstance();
  const roleId = form.getFieldValue('roleId');
  useEffect(() => {
    const loadList = async () => {
      if (roleId) {
        const { menus, checkedKeys } = await rolePermission(roleId);
        setTreeData(convertToTreeData(menus));
        setCheckedKeys(checkedKeys);
        setExpandedKeys(checkedKeys); // 自动展开选中的菜单
      } else {
        const menus = await list();
        setTreeData(convertToTreeData(menus));
        setCheckedKeys([]);
        setExpandedKeys([]);
      }
    };
    loadList();
  }, [roleId]);

  const onExpand = (expandedKeysValue: React.Key[]) => {
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onCheck = (checkedKeysValue: any) => {
    setCheckedKeys(checkedKeysValue);
  };

  return (
    <div style={{ border: 'dashed gray' }}>
      {treeData && treeData.length > 0 && (
        <Tree
          checkable
          height={250}
          onExpand={onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          onCheck={onCheck}
          checkedKeys={checkedKeys}
          treeData={treeData}
        />
      )}
    </div>
  );
};

export default PermissionTree;
