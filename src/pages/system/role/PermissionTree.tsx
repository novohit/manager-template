import React, { useEffect, useState } from 'react';
import { Tree } from 'antd';
import type { TreeDataNode } from 'antd';
import { list, rolePermission } from '@/services/menu';
import { Menu } from '@/types/response/menu';

interface Props {
  roleId?: string;
}

const convertToTreeData = (menus: Menu[] = []) => {
  if (menus.length === 0) return [];
  const treeData: TreeDataNode[] = [];
  menus.forEach(menu => {
    treeData.push({ title: menu.menuName, key: menu.menuId, children: convertToTreeData(menu.children) });
  });
  return treeData;
};

const PermissionTree: React.FC<Props> = (props: Props) => {
  const [treeData, setTreeData] = useState<TreeDataNode[]>([]);
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>();
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>();
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);
  useEffect(() => {
    const loadList = async () => {
      if (props.roleId) {
        const { menus, checkedKeys } = await rolePermission(props.roleId);
        setTreeData(convertToTreeData(menus));
        setCheckedKeys(checkedKeys);
        setExpandedKeys(checkedKeys); // 自动展开选中的菜单
      } else {
        const menus = await list();
        setTreeData(convertToTreeData(menus));
      }
    };
    loadList();
  }, [props]);

  const onExpand = (expandedKeysValue: React.Key[]) => {
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onCheck = (checkedKeysValue: React.Key[]) => {
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
