import { UserAddOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Space, Typography, message } from 'antd';
import React, { FC } from 'react';
import styles from './Login.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { REGISTER_PATH } from '@/router';

const { Title } = Typography;

const Login: FC = () => {
  const nav = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div>
          <Space>
            <Title level={2}>
              <UserAddOutlined />
            </Title>
            <Title level={2}>用户登录</Title>
          </Space>
        </div>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          onFinish={() => {}}
          initialValues={{ remember: true }} // 设置默认值
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
              <Button type="primary" htmlType="submit">
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
