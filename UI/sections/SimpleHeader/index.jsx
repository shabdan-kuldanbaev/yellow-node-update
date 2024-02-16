import Breadcrumbs from 'UI/components/Breadcrumbs';
import Logo from 'UI/components/Logo';
import styles from './styles.module.scss';

const SimpleHeader = ({ breadcrumbs, type, dark }) => (
  <header className={styles.header}>
    <div className={styles.nav}>
      <Logo type={type} />
    </div>
    <Breadcrumbs
      breadcrumbs={breadcrumbs}
      className={styles.breadcrumbs}
      dark={!dark}
    />
  </header>
);

export default SimpleHeader;
