import LinkWrapper from 'UI/components/LinkWrapper';
import Typography from 'UI/components/Typography';
import { routes } from 'utils/routes';
import styles from './styles.module.scss';

const BottomContent = () => (
  <div className={styles.bottomContent}>
    <Typography
      className={styles.text}
      variant="span"
    >
      © All right reserved. Yellow 2024
    </Typography>
    <div className={styles.links}>
      <LinkWrapper path={routes.privacyPolicy.path}>Privacy Policy</LinkWrapper>
      <LinkWrapper path={routes.termsAndConditions.path}>Terms & Privacy</LinkWrapper>
    </div>
  </div>
);

export default BottomContent;
