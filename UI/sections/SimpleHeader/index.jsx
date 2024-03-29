import Logo from 'UI/components/Logo';
import styles from './styles.module.scss';

const SimpleHeader = ({ breadcrumbs, type, dark }) => (
  <header className={styles.header}>
    <div className={styles.nav}>
      <Logo type={type} />
    </div>
  </header>
);

export default SimpleHeader;
