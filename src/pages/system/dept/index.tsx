import SearchForm from '@/components/SearchForm';
import { Button, Form, Input, Space } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import styles from '@/pages/Common.module.scss';
import { message, modal } from '@/utils/GlobalContext';
import { ExclamationCircleFilled } from '@ant-design/icons';
import Table, { ColumnsType } from 'antd/es/table';
import { Dept } from '@/types/response/dept';
import { del, list } from '@/services/dept';
import { ModalRef, Operation } from '@/types/modal';
import OperationModal from './OperationModal';

const DeptList: React.FC = () => {
  const [deptList, setDeptList] = useState<Dept[]>([]);
  const [form] = Form.useForm();
  const modalRef = useRef<ModalRef<Dept | { parentId: string }>>();
  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]);

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
                  handleCreate(record.deptId);
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
                  deleteConfirm(record.deptId);
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
    setDeptList(resp);
  };

  const handleReset = () => {
    // TODO 删除查询条件时 自动重置
    form.resetFields();
  };

  const handleCreate = (parentId: string) => {
    modalRef.current?.open(Operation.CREATE, { parentId });
  };

  const handleUpdate = (dept: Dept) => {
    modalRef.current?.open(Operation.UPDATE, dept);
  };

  const handleDelete = async (deptId: string) => {
    await del([deptId]);
    message.success('success');
    loadList();
  };

  const handleExpand = () => {
    if (expandedRowKeys.length > 0) {
      setExpandedRowKeys([]);
    } else {
      setExpandedRowKeys(getNonLeafDeptIds(deptList));
    }
  };

  function deleteConfirm(deptId: string) {
    // 静态方法 https://ant.design/docs/blog/why-not-static-cn
    modal.confirm({
      title: '确认删除？',
      icon: <ExclamationCircleFilled />,
      content: '删除后无法恢复',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        handleDelete(deptId);
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
          rowKey={item => item.deptId}
          dataSource={deptList}
          columns={columns}
          expandable={{
            expandedRowKeys: expandedRowKeys,
            onExpand: (expanded, record) => {
              if (expanded) {
                setExpandedRowKeys(expandedRowKeys.concat([record.deptId]));
              } else {
                // TODO 同时折叠子项
                setExpandedRowKeys(
                  expandedRowKeys.filter(key => {
                    if (key === record.deptId) return false;
                    return true;
                  })
                );
              }
            },
          }}
          pagination={false}
        />
      </div>
      <OperationModal ref={modalRef} deptList={deptList} refresh={loadList} />
    </Space>
  );
};

function getNonLeafDeptIds(deptList: Dept[]): string[] {
  let result: string[] = [];
  for (const dept of deptList) {
    if (dept.children && dept.children.length > 0) {
      result.push(dept.deptId);
      const childrenNonLeafDeptIds = getNonLeafDeptIds(dept.children);
      result = result.concat(childrenNonLeafDeptIds);
    }
  }
  return result;
}

export default DeptList;
