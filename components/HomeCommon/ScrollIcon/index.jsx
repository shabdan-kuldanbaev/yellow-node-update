import Svg from 'UI/components/Svg';
import styles from './styles.module.scss';

const ScrollIcon = () => (
  <div className={styles.iconWrapper}>
    <Svg
      type="arrowNarrowUp"
      className={styles.scrollDown}
    />
  </div>
);

export default ScrollIcon;
