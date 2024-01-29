import React from 'react';
import styles from '@/pages/Common.module.scss';
import { Button, Form, FormInstance } from 'antd';

interface Props {
  children: JSX.Element | JSX.Element[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: FormInstance<any>;
  handleSearch: () => void;
  handleReset: () => void;
}

const SearchForm: React.FC<Props> = (props: Props) => {
  const { children, form, handleSearch, handleReset } = props;

  return (
    <div className={styles['search-form']}>
      <Form form={form} layout="inline">
        {children}
        <Form.Item>
          <Button type="primary" onClick={handleSearch}>
            Search
          </Button>
        </Form.Item>
        <Form.Item>
          <Button onClick={handleReset}>Reset</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SearchForm;
