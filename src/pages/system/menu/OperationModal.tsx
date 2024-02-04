import { create, update } from '@/services/menu';
import { Operation } from '@/types/modal';
import { Menu } from '@/types/response/menu';
import { message } from '@/utils/GlobalContext';
import { Form, Input, Modal, Radio, TreeSelect } from 'antd';
import React, { useImperativeHandle, useState } from 'react';

interface Props {
  // 操作后刷新列表的函数
  refresh: () => void;
  menuList: Menu[];
}

const OperationModal = React.forwardRef((props: Props, ref) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState<boolean>(false);
  const [operation, setOperation] = useState<Operation>();
  const [menuList, setMenuList] = useState<Menu[]>([]);

  console.log('menu modal');

  // 暴露 open 方法给父组件调用
  useImperativeHandle(ref, () => ({
    open: (operation: Operation, payload: Menu | { parentId: string }) => {
      setVisible(true);
      setOperation(operation);
      setMenuList(props.menuList);
      form.setFieldsValue(payload);
    },
  }));

  const handleOk = async () => {
    const valid = await form.validateFields();
    if (!valid) return;
    if (operation === Operation.CREATE) {
      create(form.getFieldsValue());
    } else {
      update(form.getFieldValue('menuId'), form.getFieldsValue());
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
      title={operation === Operation.CREATE ? 'Add Menu' : 'Edit Menu'}
      width={800}
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} initialValues={{ type: 'DIR', state: 'active' }} labelCol={{ span: 4 }} labelAlign="right">
        <Form.Item label="ID" name="menuId" hidden={operation === Operation.CREATE}>
          <Input disabled />
        </Form.Item>
        <Form.Item label="上级菜单" name="parentId">
          <TreeSelect
            placeholder="请选择上级菜单"
            allowClear
            treeLine
            treeDefaultExpandAll
            fieldNames={{ label: 'menuName', value: 'menuId' }}
            treeData={menuList}
          />
        </Form.Item>
        <Form.Item label="菜单类型" name="type">
          <Radio.Group
            options={[
              { label: '目录', value: 'DIR' },
              { label: '菜单', value: 'MENU' },
              { label: '按钮', value: 'BUTTON' },
            ]}
          />
        </Form.Item>
        <Form.Item label="菜单名称" name="menuName">
          <Input placeholder="请输入菜单名称"></Input>
        </Form.Item>
        <Form.Item noStyle shouldUpdate>
          {() => {
            const type = form.getFieldValue('type');
            const iconItem = (
              <Form.Item label="菜单图标" name="icon">
                <Input placeholder="请选择icon"></Input>
              </Form.Item>
            );
            const routerAndCompItem = (
              <>
                <Form.Item label="路由路径" name="router">
                  <Input placeholder="请输入路由路径"></Input>
                </Form.Item>
                <Form.Item label="组件路径" name="component">
                  <Input placeholder="请输入组件路径"></Input>
                </Form.Item>
              </>
            );
            const menuCodeItem = (
              <Form.Item label="权限标识" name="menuCode">
                <Input placeholder="请输入权限标识"></Input>
              </Form.Item>
            );
            switch (type) {
              case 'DIR':
                return iconItem;
              case 'MENU':
                return (
                  <>
                    {iconItem} {menuCodeItem} {routerAndCompItem}
                  </>
                );
              case 'BUTTON':
                return menuCodeItem;
              default:
                return <></>;
            }
          }}
        </Form.Item>
        <Form.Item label="排序" name="orderNum" tooltip={{ title: '值越大，顺序越靠后' }}>
          <Input placeholder="请输入排序值"></Input>
        </Form.Item>
        <Form.Item label="状态" name="state">
          <Radio.Group
            options={[
              { label: '启用', value: 'active' },
              { label: '禁用', value: 'disable' },
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
});

export default OperationModal;
