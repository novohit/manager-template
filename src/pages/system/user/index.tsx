import { User } from '@/types/response/user';
import { Button, Form, Input, Space, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import styles from '@/pages/Common.module.scss';
import { getUserList } from '@/services/user';

const columns: ColumnsType<User> = [
  {
    title: 'ID',
    dataIndex: 'userId',
    fixed: 'left',
  },
  {
    title: '用户名',
    dataIndex: 'username',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
  },
  {
    title: '年龄',
    dataIndex: 'age',
  },
  {
    title: '头像',
    dataIndex: 'avatar',
  },
  {
    title: '是否收藏',
    dataIndex: 'isStar',
    render: (isStar: boolean) => {
      return isStar ? <Tag color="processing">已收藏</Tag> : <Tag>未收藏</Tag>;
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
  },
  {
    title: '删除时间',
    dataIndex: 'deletedAt',
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
            <Button type="text" size="small">
              编辑
            </Button>
            <Button danger type="link" size="small">
              删除
            </Button>
          </Space>
        </>
      );
    },
    fixed: 'right',
  },
];

const UserList: React.FC = () => {
  const [userList, setUserList] = useState<User[]>();
  const [selectedIds, setSelectedIds] = useState<React.Key[]>([]);

  useEffect(() => {
    async function list() {
      const userList = await getUserList();
      setUserList(userList);
    }
    list();
  }, []);

  function onSelectChange(selectedIds: React.Key[]) {
    setSelectedIds(selectedIds);
  }

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <div className={styles['search-form']}>
        <Form layout="inline">
          <Form.Item label="username" name="username">
            <Input />
          </Form.Item>
          <Form.Item label="email" name="email">
            <Input />
          </Form.Item>
          <Form.Item label="xmail" name="xmail">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary">Search</Button>
          </Form.Item>
        </Form>
      </div>
      <div className={styles['base-table']}>
        <div className={styles['header-wrapper']}>
          <div>UserList</div>
          <Button type="primary">Add</Button>
          <Button type="primary" danger>
            Delete
          </Button>
        </div>
        <Table
          rowKey={q => q.userId}
          dataSource={userList}
          rowSelection={{
            selectedRowKeys: selectedIds,
            onChange: onSelectChange,
          }}
          columns={columns}
          pagination={false}
          scroll={{ x: 1500, y: 300 }}
        />
      </div>
    </Space>
  );
};

export default UserList;
