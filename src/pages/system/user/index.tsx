import { User } from '@/types/response/user';
import { Button, Form, Input, Select, Space, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useEffect, useRef, useState } from 'react';
import styles from '@/pages/Common.module.scss';
import { del, getUserList } from '@/services/user';
import { DEFAULT_PAGE_SIZE } from '@/constants';
import SearchForm from '@/components/SearchForm';
import OperationModal from './OperationModal';
import { ModalRef, Operation } from '@/types/modal';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { message, modal } from '@/utils/GlobalContext';

const UserList: React.FC = () => {
  const [userList, setUserList] = useState<User[]>();
  const [selectedIds, setSelectedIds] = useState<React.Key[]>([]);
  // 属性名为current作为useEffect依赖性会有警告 https://segmentfault.com/q/1010000042967954
  const [pagination, setPagination] = useState({
    page: 1,
    size: DEFAULT_PAGE_SIZE,
  });
  const [total, setTotal] = useState(0);
  const [form] = Form.useForm();
  const modalRef = useRef<ModalRef<User>>();
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

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
      title: '手机号',
      dataIndex: 'phone',
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
                onClick={deleteConfirm}
                disabled={selectedIds.length === 0 || deleteLoading}
              >
                Delete
              </Button>
            </Space>
          </>
        );
      },
      fixed: 'right',
    },
  ];

  useEffect(() => {
    loadList({ page: pagination.page, size: pagination.size });
  }, [pagination.page, pagination.size]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const loadList = async ({ page, size }: { page?: number; size?: number }, formParams?: any) => {
    const resp = await getUserList({ page, size, ...formParams });
    setUserList(resp.list);
    setTotal(resp.total);
  };

  const handleSearch = () => {
    setPagination({ page: 1, size: pagination.size });
    loadList({ page: 1, size: pagination.size }, form.getFieldsValue());
  };

  const handleReset = () => {
    // TODO 删除查询条件时 自动重置
    form.resetFields();
  };

  const handleCreate = () => {
    modalRef.current?.open(Operation.CREATE);
  };

  const handleUpdate = (user: User) => {
    modalRef.current?.open(Operation.UPDATE, user);
  };

  const handleDelete = async () => {
    try {
      setDeleteLoading(true);
      await del(selectedIds);
    } finally {
      message.success('success');
      setDeleteLoading(false);
      setSelectedIds([]);
      handleSearch();
    }
  };

  function deleteConfirm() {
    // 静态方法 https://ant.design/docs/blog/why-not-static-cn
    modal.confirm({
      title: '确认删除？',
      icon: <ExclamationCircleFilled />,
      content: '删除后无法恢复',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        handleDelete();
      },
      onCancel() {},
    });
  }

  function onSelectChange(selectedIds: React.Key[]) {
    setSelectedIds(selectedIds);
  }

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <SearchForm form={form} handleSearch={handleSearch} handleReset={handleReset}>
        <Form.Item label="用户名" name="username">
          <Input />
        </Form.Item>
        <Form.Item label="邮箱" name="email">
          <Input />
        </Form.Item>
        <Form.Item label="手机号" name="phone">
          <Input />
        </Form.Item>
        <Form.Item label="性别" name="sex">
          <Select
            style={{ width: 60 }}
            options={[
              { value: 'male', label: '男' },
              { value: 'female', label: '女' },
              { value: 'unknown', label: '未知' },
            ]}
          />
        </Form.Item>
      </SearchForm>
      <div className={styles['base-table']}>
        <div className={styles['header-wrapper']}>
          <div>UserList</div>
          <Space>
            <Button type="primary" onClick={handleCreate}>
              Add
            </Button>
            <Button type="primary" danger onClick={handleDelete} disabled={selectedIds.length === 0 || deleteLoading}>
              Delete
            </Button>
          </Space>
        </div>
        <Table
          rowKey={q => q.userId}
          dataSource={userList}
          rowSelection={{
            selectedRowKeys: selectedIds,
            onChange: onSelectChange,
          }}
          columns={columns}
          scroll={{ x: 1500, y: 300 }}
          pagination={{
            current: pagination.page,
            pageSize: pagination.size,
            total: total,
            showSizeChanger: true,
            showTotal(total) {
              return `共 ${total} 条`;
            },
            position: ['bottomCenter'],
            onChange(page, pageSize) {
              setPagination({ page, size: pageSize });
            },
          }}
        />
      </div>
      <OperationModal ref={modalRef} refresh={handleSearch} />
    </Space>
  );
};

export default UserList;
