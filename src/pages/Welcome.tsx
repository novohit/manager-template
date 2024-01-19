import { hello } from '@/services/hello';
import React, { useEffect, useState } from 'react';

const Welcome: React.FC = () => {
  const [name, setName] = useState('');

  useEffect(() => {
    async function get() {
      const name = await hello();
      setName(name);
    }
    get();
  }, []);

  return (
    <>
      <span>welcome, {name}</span>
    </>
  );
};

export default Welcome;
