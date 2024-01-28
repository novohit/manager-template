import { Pagination } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { DEFAULT_PAGE_SIZE, PAGE_NUM_KEY, PAGE_SIZE_KEY } from '@/constants';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

type PropsType = {
  total?: number;
};

const ListPage: FC<PropsType> = (props: PropsType) => {
  const { total = 100 } = props;
  const [current, setCurrent] = useState(3);
  const [size, setSize] = useState(DEFAULT_PAGE_SIZE);
  const [searchParams] = useSearchParams();
  const nav = useNavigate();
  const { pathname } = useLocation();

  // 路由参数同步到分页组件中
  useEffect(() => {
    const page = parseInt(searchParams.get(PAGE_NUM_KEY) || '') || 1;
    const size = parseInt(searchParams.get(PAGE_SIZE_KEY) || '') || DEFAULT_PAGE_SIZE;
    setCurrent(page);
    setSize(size);
  }, [searchParams]);

  function onChange(page: number, pageSize: number) {
    // 更新而不是直接`${PAGE_NUM_KEY}=${page}&${PAGE_SIZE_KEY}=${pageSize}`拼接，因为会丢失keyword
    searchParams.set(PAGE_NUM_KEY, page.toString());
    searchParams.set(PAGE_SIZE_KEY, pageSize.toString());
    nav({
      pathname,
      search: searchParams.toString(),
    });
  }

  return <Pagination current={current} pageSize={size} total={total} onChange={onChange} />;
};

export default ListPage;
