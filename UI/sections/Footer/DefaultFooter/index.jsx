import { memo } from 'react';
import dynamic from 'next/dynamic';
import { SVG_IMAGES_TYPES } from 'utils/constants';
import SideContent from './SideContent';
import MainContent from './MainContent';
import BottomContent from './BottomContent';
import CircleButton from './CircleButton';
import Addresses from './Addresses';
import Company from './Company';
import MainContentWithExpand from './MainContentWithExpand';
import styles from './styles.module.scss';

const Svg = dynamic(() => import('UI/components/Svg'));

const DefaultFooter = () => {
  const onClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footer}>
        <SideContent />
        <Company />
        <Addresses />
        <MainContent />
        <MainContentWithExpand />
      </div>
      <BottomContent />
      <CircleButton onClick={onClick}>
        <Svg
          type={SVG_IMAGES_TYPES.arrowNarrowUp}
          className={styles.buttonImage}
        />
      </CircleButton>
    </footer>
  );
};

export default memo(DefaultFooter);
