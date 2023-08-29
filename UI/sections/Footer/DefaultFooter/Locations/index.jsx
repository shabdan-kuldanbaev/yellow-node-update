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
      <LinkWrapper path={PAGES.softwareDevelopmentOmaha}>Omaha, NE</LinkWrapper>
      <LinkWrapper path={PAGES.softwareDevelopmentMiami}>Miami, FL</LinkWrapper>
      <LinkWrapper path={PAGES.softwareDevelopmentMinneapolis}>Minneapolis, MN</LinkWrapper>
      <LinkWrapper path={PAGES.softwareDevelopmentTulsa}>Tulsa, OK</LinkWrapper>
      <LinkWrapper path={PAGES.softwareDevelopmentNewOrleans}>New Orleans, LA</LinkWrapper>
    </p>
  </div>
);
