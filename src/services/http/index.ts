import axios, { AxiosError, AxiosResponse } from 'axios';
import { message as Message } from 'antd';
import { getToken } from '@/utils/token';

const instance = axios.create({
  timeout: 10 * 1000,
});

// request 拦截器
instance.interceptors.request.use(
  config => {
    config.headers['Authorization'] = `Bearer ${getToken()}`;
    return config;
  },
  error => Promise.reject(error)
);

// response 拦截器：统一处理 code 和 message
instance.interceptors.response.use(
  (res: AxiosResponse) => {
    const resp = (res.data as Response) || {};
    const { code, data, message = '系统异常' } = resp;
    if (code !== 0) {
      Message.error(message);
      // return Promise.reject(new Error(message));
      // TODO reject 异常处理
      return new Promise(() => {});
    }
    return data;
  },
  (error: AxiosError) => {
    // 处理 HTTP 网络错误
    let message = '';
    // HTTP 状态码
    const status = error.response?.status;
    switch (status) {
      case 401:
        message = 'token 失效，请重新登录';
        // 这里可以触发退出的 action
        break;
      case 403:
        message = '拒绝访问';
        break;
      case 404:
        message = '请求地址错误';
        break;
      case 500:
        message = '服务器故障';
        break;
      default:
        message = '网络连接故障';
    }

    Message.error(message);
    return Promise.reject(error);
  }
);

export interface Response {
  code: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  message?: string;
}

export default instance;
