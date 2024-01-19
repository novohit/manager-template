import http from './http';

export async function hello() {
  const url = '/api/hello';
  const data = (await http.get(url)) as string;
  return data;
}
