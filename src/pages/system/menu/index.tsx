import SearchForm from '@/components/SearchForm';
import { Button, Form, Input, Space } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import styles from '@/pages/Common.module.scss';
import { message, modal } from '@/utils/GlobalContext';
import { ExclamationCircleFilled } from '@ant-design/icons';
import Table, { ColumnsType } from 'antd/es/table';
import { Menu } from '@/types/response/menu';
import { del, list } from '@/services/menu';
import { ModalRef, Operation } from '@/types/modal';
import OperationModal from './OperationModal';

const MenuList: React.FC = () => {
  const [MenuList, setMenuList] = useState<Menu[]>([]);
  const [form] = Form.useForm();
  const modalRef = useRef<ModalRef<Menu | { parentId: string }>>();
  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]);

  const columns: ColumnsType<Menu> = [
    {
      title: '菜单',
      dataIndex: 'menuName',
      align: 'center',
    },
    {
      title: '图标',
      dataIndex: 'icon',
      align: 'center',
    },
    {
      title: '排序',
      dataIndex: 'orderNum',
      align: 'center',
    },
    {
      title: '权限标识',
      dataIndex: 'menuCode',
      align: 'center',
    },
    {
      title: '路由',
      dataIndex: 'router',
      align: 'center',
    },
    {
      title: '状态',
      dataIndex: 'state',
      align: 'center',
    },
    {
      title: '组件路径',
      dataIndex: 'component',
      align: 'center',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      align: 'center',
      width: 160,
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      align: 'center',
      width: 160,
    },
    // 用原生的onClick，这里拿不到selectedId 无法操作 得封装起来
    {
      title: '操作',
      dataIndex: 'operation',
      // render 第二个参数可以拿到每一行的对象信息
      render: (_, record) => {
        return (
          <>
            <Space>
              <Button
                type="text"
                size="small"
                onClick={() => {
                  handleCreate(record.id);
                }}
              >
                Add
              </Button>
              <Button
                type="text"
                size="small"
                onClick={() => {
                  handleUpdate(record);
                }}
              >
                Edit
              </Button>
              <Button
                danger
                type="link"
                size="small"
                onClick={() => {
                  deleteConfirm(record.id);
                }}
              >
                Delete
              </Button>
            </Space>
          </>
        );
      },
      width: 150,
      align: 'center',
    },
  ];

  useEffect(() => {
    loadList();
  }, []);

  const loadList = async () => {
    const resp = await list();
    setMenuList(resp);
  };

  const handleReset = () => {
    // TODO 删除查询条件时 自动重置
    form.resetFields();
  };

  const handleCreate = (parentId: string) => {
    modalRef.current?.open(Operation.CREATE, { parentId });
  };

  const handleUpdate = (menu: Menu) => {
    modalRef.current?.open(Operation.UPDATE, menu);
  };

  const handleDelete = async (menuId: string) => {
    await del([menuId]);
    message.success('success');
    loadList();
  };

  const handleExpand = () => {
    if (expandedRowKeys.length > 0) {
      setExpandedRowKeys([]);
    } else {
      setExpandedRowKeys(getNonLeafMenuIds(MenuList));
    }
  };

  function deleteConfirm(menuId: string) {
    // 静态方法 https://ant.design/docs/blog/why-not-static-cn
    modal.confirm({
      title: '确认删除？',
      icon: <ExclamationCircleFilled />,
      content: '删除后无法恢复',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        handleDelete(menuId);
      },
      onCancel() {},
    });
  }

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <SearchForm form={form} handleSearch={() => {}} handleReset={handleReset}>
        <Form.Item label="菜单名称" name="email">
          <Input />
        </Form.Item>
      </SearchForm>
      <div className={styles['base-table']}>
        <div className={styles['header-wrapper']}>
          <div>Menu List</div>
          <Space>
            <Button onClick={handleExpand}>{expandedRowKeys.length > 0 ? 'Collapse' : 'Expand'}</Button>
            <Button
              type="primary"
              onClick={() => {
                handleCreate('');
              }}
            >
              Add
            </Button>
          </Space>
        </div>
        <Table
          rowKey={item => item.id}
          dataSource={MenuList}
          columns={columns}
          expandable={{
            expandedRowKeys: expandedRowKeys,
            onExpand: (expanded, record) => {
              if (expanded) {
                setExpandedRowKeys(expandedRowKeys.concat([record.id]));
              } else {
                // TODO 同时折叠子项
                setExpandedRowKeys(
                  expandedRowKeys.filter(key => {
                    if (key === record.id) return false;
                    return true;
                  })
                );
              }
            },
          }}
          pagination={false}
        />
      </div>
      <OperationModal ref={modalRef} menuList={MenuList} refresh={loadList} />
    </Space>
  );
};

function getNonLeafMenuIds(MenuList: Menu[]): string[] {
  let result: string[] = [];
  for (const menu of MenuList) {
    if (menu.children && menu.children.length > 0) {
      result.push(menu.id);
      const childrenNonLeafmenuIds = getNonLeafMenuIds(menu.children);
      result = result.concat(childrenNonLeafmenuIds);
    }
  }
  return result;
}

export default MenuList;
