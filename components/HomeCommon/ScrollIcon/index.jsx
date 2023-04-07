import dynamic from 'next/dynamic';
import styles from './styles.module.scss';

const Svg = dynamic(() => import('UI/components/Svg'));

const ScrollIcon = () => (
  <div className={styles.iconWrapper}>
    <Svg
      type="arrowNarrowUp"
      className={styles.scrollDown}
    />
  </div>
);

export default ScrollIcon;
