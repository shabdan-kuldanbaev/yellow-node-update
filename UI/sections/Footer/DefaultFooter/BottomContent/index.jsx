import LinkWrapper from 'UI/components/LinkWrapper';
import { PAGES } from 'utils/constants';
import Typography from 'UI/components/Typography';
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
      <LinkWrapper path={PAGES.privacyPolicy}>Privacy Policy</LinkWrapper>
      <LinkWrapper path={PAGES.termsAndConditions}>Terms & Privacy</LinkWrapper>
    </div>
  </div>
);

export default BottomContent;
