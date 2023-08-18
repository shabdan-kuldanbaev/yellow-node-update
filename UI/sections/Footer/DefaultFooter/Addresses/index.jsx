import Typography from 'UI/components/Typography';
import CompanyLocation from 'UI/components/CompanyLocation';
import { addresses } from 'UI/components/CompanyLocation/utils/data';
import styles from './styles.module.scss';

const Addresses = () => (
  <div className={styles.container}>
    <Typography
      variant="p"
      className={styles.blockTitle}
    >
      Find us
    </Typography>

    <CompanyLocation
      addresses={addresses}
      containerClass={styles.container}
      itemClass={styles.item}
    />
  </div>
);

export default Addresses;
