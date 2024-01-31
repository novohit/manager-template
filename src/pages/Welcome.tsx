import { hello } from '@/services/hello';
import React, { useEffect, useState } from 'react';
import styles from './Welcome.module.scss';

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
      <div className={styles.content}>
        <span>welcome, {name}</span>
        <div className={styles.title}>React-Admin</div>
        <div className={styles.title}>React-Admin</div>
        <div className={styles.title}>React-Admin</div>
        <div className={styles.title}>React-Admin</div>
        <div className={styles.desc}>React18</div>
      </div>
      {/* <div className={styles.img}></div> */}
    </>
  );
};

export default Welcome;
