import { create, update } from '@/services/dept';
import { Operation } from '@/types/modal';
import { Dept } from '@/types/response/dept';
import { message } from '@/utils/GlobalContext';
import { Form, Input, Modal, TreeSelect } from 'antd';
import React, { useImperativeHandle, useState } from 'react';

interface Props {
  // 操作后刷新列表的函数
  refresh: () => void;
  deptList: Dept[];
}

const OperationModal = React.forwardRef((props: Props, ref) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState<boolean>(false);
  const [operation, setOperation] = useState<Operation>();
  const [deptList, setDeptList] = useState<Dept[]>([]);
  const [key, setKey] = useState(0);

  // 暴露 open 方法给父组件调用
  useImperativeHandle(ref, () => ({
    open: (operation: Operation, payload: Dept | { parentId: string }) => {
      setVisible(true);
      setOperation(operation);
      setDeptList(props.deptList);
      setKey(key + 1);
      form.resetFields();
      form.setFieldsValue(payload);
    },
  }));

  const handleOk = async () => {
    const valid = await form.validateFields();
    if (!valid) return;
    if (operation === Operation.CREATE) {
      create(form.getFieldsValue());
    } else {
      update(form.getFieldValue('deptId'), form.getFieldsValue());
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
      title={operation === Operation.CREATE ? 'Add Dept' : 'Edit Dept'}
      width={800}
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} labelCol={{ span: 4 }} labelAlign="right">
        <Form.Item label="ID" name="deptId" hidden={operation === Operation.CREATE}>
          <Input disabled />
        </Form.Item>
        <Form.Item label="上级部门" name="parentId">
          <TreeSelect
            placeholder="请选择上级部门"
            allowClear
            treeLine
            treeDefaultExpandAll
            fieldNames={{ label: 'deptName', value: 'deptId' }}
            treeData={deptList}
          />
        </Form.Item>
        <Form.Item label="部门名称" name="deptName">
          <Input placeholder="请输入部门名称"></Input>
        </Form.Item>
      </Form>
    </Modal>
  );
});

export default OperationModal;
