import { create, update } from '@/services/role';
import { Operation } from '@/types/modal';
import { Role } from '@/types/response/role';
import { message } from '@/utils/GlobalContext';
import { Form, Input, Modal } from 'antd';
import React, { useImperativeHandle, useState } from 'react';
import PermissionTree from './PermissionTree';

interface Props {
  // 操作后刷新列表的函数
  refresh: () => void;
}

const OperationModal = React.forwardRef((props: Props, ref) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState<boolean>(false);
  const [operation, setOperation] = useState<Operation>();

  // 暴露 open 方法给父组件调用
  useImperativeHandle(ref, () => ({
    open: (operation: Operation, payload: Role) => {
      setVisible(true);
      setOperation(operation);
      if (operation === Operation.UPDATE && payload) {
        form.setFieldsValue(payload);
      }
    },
  }));

  const handleOk = async () => {
    const valid = await form.validateFields();
    if (!valid) return;
    if (operation === Operation.CREATE) {
      create(form.getFieldsValue());
    } else {
      update(form.getFieldValue('roleId'), form.getFieldsValue());
    }
    message.success('success');
    props.refresh();
    handleCancel();
  };

  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  // TODO 表单校验
  return (
    <Modal
      title={operation === Operation.CREATE ? 'Add Role' : 'Edit Role'}
      width={800}
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} labelCol={{ span: 4 }} labelAlign="right">
        <Form.Item label="ID" name="roleId" hidden={operation === Operation.CREATE}>
          <Input disabled />
        </Form.Item>
        <Form.Item label="角色" name="roleName">
          <Input placeholder="请输入角色名称"></Input>
        </Form.Item>
        <Form.Item label="权限" name="s">
          {visible && <PermissionTree roleId={form.getFieldValue('roleId')} />}
        </Form.Item>
        <Form.Item label="Code" name="roleCode">
          <Input placeholder="请输入Code"></Input>
        </Form.Item>
      </Form>
    </Modal>
  );
});

export default OperationModal;
