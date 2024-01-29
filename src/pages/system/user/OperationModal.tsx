import { create, update } from '@/services/user';
import { Operation } from '@/types/modal';
import { User } from '@/types/response/user';
import { message } from '@/utils/GlobalContext';
import { Form, Input, Modal } from 'antd';
import React, { useImperativeHandle, useState } from 'react';

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
    open: (operation: Operation, payload: User) => {
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
      update(form.getFieldValue('userId'), form.getFieldsValue());
    }
    message.success('success');
    props.refresh();
    handleCancel();
  };

  const handleCancel = () => {
    setVisible(false);
  };

  // TODO 表单校验
  return (
    <Modal
      title={operation === Operation.CREATE ? 'Add User' : 'Edit User'}
      width={800}
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} labelCol={{ span: 4 }} labelAlign="right">
        <Form.Item label="ID" name="userId" hidden={operation === Operation.CREATE}>
          <Input disabled />
        </Form.Item>
        <Form.Item label="用户名称" name="username">
          <Input placeholder="请输入用户名称"></Input>
        </Form.Item>
        <Form.Item label="用户邮箱" name="email">
          <Input placeholder="请输入用户邮箱"></Input>
        </Form.Item>
        <Form.Item label="手机号" name="phone">
          <Input placeholder="请输入手机号"></Input>
        </Form.Item>
      </Form>
    </Modal>
  );
});

export default OperationModal;
