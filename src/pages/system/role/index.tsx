import { Role } from '@/types/response/role';
import { Button, Form, Input, Space, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useEffect, useRef, useState } from 'react';
import styles from '@/pages/Common.module.scss';
import { del, list } from '@/services/role';
import SearchForm from '@/components/SearchForm';
import OperationModal from './OperationModal';
import { ModalRef, Operation } from '@/types/modal';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { message, modal } from '@/utils/GlobalContext';

const RoleList: React.FC = () => {
  const [roleList, setRoleList] = useState<Role[]>();
  const [form] = Form.useForm();
  const modalRef = useRef<ModalRef<Role>>();

  const columns: ColumnsType<Role> = [
    {
      title: 'ID',
      dataIndex: 'roleId',
      width: 170,
      align: 'center',
    },
    {
      title: '角色',
      dataIndex: 'roleName',
      align: 'center',
    },
    {
      title: 'Code',
      dataIndex: 'roleCode',
      align: 'center',
    },
    {
      title: '状态',
      dataIndex: 'state',
      render: (state: string) => {
        return state === 'active' ? <Tag color="processing">正常</Tag> : <Tag>停用</Tag>;
      },
      align: 'center',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      width: 160,
      align: 'center',
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      width: 160,
      align: 'center',
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
                onClick={() => {
                  deleteConfirm(record.roleId);
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const loadList = async () => {
    const resp = await list();
    setRoleList(resp);
  };

  const handleSearch = () => {};

  const handleReset = () => {
    // TODO 删除查询条件时 自动重置
    form.resetFields();
    loadList();
  };

  const handleCreate = () => {
    modalRef.current?.open(Operation.CREATE);
  };

  const handleUpdate = (role: Role) => {
    modalRef.current?.open(Operation.UPDATE, role);
  };

  const handleDelete = async (roleId: string) => {
    await del([roleId]);
    message.success('success');
    loadList();
  };

  function deleteConfirm(roleId: string) {
    // 静态方法 https://ant.design/docs/blog/why-not-static-cn
    modal.confirm({
      title: '确认删除？',
      icon: <ExclamationCircleFilled />,
      content: '删除后无法恢复',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        handleDelete(roleId);
      },
      onCancel() {},
    });
  }

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <SearchForm form={form} handleSearch={handleSearch} handleReset={handleReset}>
        <Form.Item label="角色" name="roleName">
          <Input />
        </Form.Item>
      </SearchForm>
      <div className={styles['base-table']}>
        <div className={styles['header-wrapper']}>
          <div>Role List</div>
          <Space>
            <Button type="primary" onClick={handleCreate}>
              Add
            </Button>
          </Space>
        </div>
        <Table rowKey={item => item.roleId} dataSource={roleList} columns={columns} pagination={false} />
      </div>
      <OperationModal ref={modalRef} refresh={handleSearch} />
    </Space>
  );
};

export default RoleList;
