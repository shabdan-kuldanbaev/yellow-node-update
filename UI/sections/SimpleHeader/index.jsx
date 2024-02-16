import Breadcrumbs from 'UI/components/Breadcrumbs';
import Logo from 'UI/components/Logo';
import styles from './styles.module.scss';

const SimpleHeader = ({ breadcrumbs, type, dark }) => (
  <>
    <header className={styles.header}>
      <div className={styles.container}>
        <Logo type={type} />
      </div>
    </header>
    <Breadcrumbs
      breadcrumbs={breadcrumbs}
      className={styles.breadcrumbs}
      dark={!dark}
    />
  </>
);

export default SimpleHeader;
