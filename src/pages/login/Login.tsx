import { UserAddOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Space, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './Login.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { ADMIN_PATH, REGISTER_PATH } from '@/router';
import { UserLoginReq } from '@/types/request/user';
import { login } from '@/services/user';
import { setToken } from '@/utils/token';

const { Title } = Typography;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);

  // 进入登陆页时，判断之前是否保存了用户名和密码
  useEffect(() => {
    const rememberConfig = localStorage.getItem('rememberConfig');
    if (rememberConfig) {
      const values: UserLoginReq = JSON.parse(rememberConfig);
      form.setFieldsValue(values);
    }
  }, [form]);

  // 登录
  const onFinish = async (values: UserLoginReq) => {
    // 保证请求错误时局部loading能被正确关闭
    try {
      setLoading(true);
      localStorage.removeItem('rememberConfig');
      if (form.getFieldValue('remember') === true) {
        // TODO 加密存储
        localStorage.setItem('rememberConfig', JSON.stringify(form.getFieldsValue()));
      }
      const token = await login(values);
      setToken(token);
      navigate(ADMIN_PATH);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.title}>
          <Space>
            <Title level={2}>
              <UserAddOutlined />
            </Title>
            <Title level={2}>用户登录</Title>
          </Space>
        </div>
        <Form
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          initialValues={{ remember: false }} // 设置默认值
        >
          <Form.Item label="用户名" name="username">
            <Input />
          </Form.Item>
          <Form.Item label="用户密码" name="password">
            <Input.Password />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 6, span: 16 }}>
            <Checkbox checked>记住我</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
            <Space direction="horizontal">
              <Button type="primary" htmlType="submit" loading={loading} disabled={loading}>
                登录
              </Button>
              <Link to={REGISTER_PATH}>暂无账户，去注册</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
