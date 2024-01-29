import SearchForm from '@/components/SearchForm';
import { Button, Form, Input, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from '@/pages/Common.module.scss';
import { modal } from '@/utils/GlobalContext';
import { ExclamationCircleFilled } from '@ant-design/icons';
import Table, { ColumnsType } from 'antd/es/table';
import { Dept } from '@/types/response/dept';
import { list } from '@/services/dept';

const DeptList: React.FC = () => {
  const [deptList, setDeptList] = useState<Dept[]>();
  const [form] = Form.useForm();

  const columns: ColumnsType<Dept> = [
    {
      title: 'ID',
      dataIndex: 'deptId',
      width: 170,
      hidden: true,
    },
    {
      title: '部门',
      dataIndex: 'deptName',
      align: 'center',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      width: 160,
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
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
                  handleUpdate();
                }}
              >
                Edit
              </Button>
              <Button danger type="link" size="small" onClick={deleteConfirm}>
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
    setDeptList(resp);
  };

  const handleReset = () => {
    // TODO 删除查询条件时 自动重置
    form.resetFields();
  };

  const handleCreate = () => {};

  const handleUpdate = () => {};

  const handleDelete = async () => {};

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

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <SearchForm form={form} handleSearch={() => {}} handleReset={handleReset}>
        <Form.Item label="部门名称" name="email">
          <Input />
        </Form.Item>
      </SearchForm>
      <div className={styles['base-table']}>
        <div className={styles['header-wrapper']}>
          <div>Dept List</div>
          <Space>
            <Button onClick={handleCreate}>Expand</Button>
            <Button type="primary" onClick={handleCreate}>
              Add
            </Button>
          </Space>
        </div>
        <Table rowKey={item => item.deptId} dataSource={deptList} columns={columns} pagination={false} />
      </div>
    </Space>
  );
};

export default DeptList;
