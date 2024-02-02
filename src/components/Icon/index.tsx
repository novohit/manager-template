import React from 'react';
import * as Icons from '@ant-design/icons';

// TODO 优化全量引入
const Icon: React.FC<{ type: string }> = (props: { type: string }) => {
  if (!props.type) return;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const icons: { [key: string]: any } = Icons;
  if (!icons[props.type]) return;
  return React.createElement(icons[props.type]);
};

export default Icon;
