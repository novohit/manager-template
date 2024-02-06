import logo from '/react.svg';
import styles from './index.module.scss';

const Logo: React.FC<{ collapsed: boolean }> = ({ collapsed }) => {
  return (
    <div className={styles['logo-box']}>
      <img src={logo} alt="logo" className={styles['logo-img']} />
      {!collapsed ? <h2 className={styles['logo-text']}>React Admin</h2> : null}
    </div>
  );
};

export default Logo;
