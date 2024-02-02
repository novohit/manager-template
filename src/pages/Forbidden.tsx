import { Button, Result } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ADMIN_PATH } from '../router';

const NotFound: React.FC = () => {
  const nav = useNavigate();

  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Button
          type="primary"
          onClick={() => {
            nav(ADMIN_PATH);
          }}
        >
          Back Home
        </Button>
      }
    />
  );
};

export default NotFound;
