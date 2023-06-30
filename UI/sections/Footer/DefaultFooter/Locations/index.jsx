import LinkWrapper from 'UI/components/LinkWrapper';
import { PAGES } from 'utils/constants';
import styles from './styles.module.scss';

export default () => (
  <div className={styles.locations}>
    <h3>Software development in:</h3>
    <p>
      <LinkWrapper path={PAGES.softwareDevelopmentColumbus}>Columbus, Ohio</LinkWrapper>
      <LinkWrapper path={PAGES.softwareDevelopmentNashville}>Nashville, TN</LinkWrapper>
      <LinkWrapper path={PAGES.softwareDevelopmentOklahoma}>Oklahoma City</LinkWrapper>
      <LinkWrapper path={PAGES.softwareDevelopmentRaleigh}>Raleigh</LinkWrapper>
      <LinkWrapper path={PAGES.softwareDevelopmentWashington}>Washington, DC</LinkWrapper>
    </p>
  </div>
);
