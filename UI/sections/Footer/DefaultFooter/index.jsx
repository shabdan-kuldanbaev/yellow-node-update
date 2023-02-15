import React from 'react';
import Svg from 'UI/components/Svg';
import { SVG_IMAGES_TYPES } from 'utils/constants';
import SideContent from './SideContent';
import MainContent from './MainContent';
import BottomContent from './BottomContent';
import CircleButton from './CircleButton';
import Addresses from './Addresses';
import Company from './Company';
import MainContentWithExpand from './MainContentWithExpand';
import styles from './styles.module.scss';

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

export default React.memo(DefaultFooter);
