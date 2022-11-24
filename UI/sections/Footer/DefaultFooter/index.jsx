import React from 'react';
import Svg from 'UI/components/Svg';
import SideContent from './SideContent';
import MainContent from './MainContent';
import BottomContent from './BottomContent';
import CircleButton from './CircleButton';
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
        <MainContent />
      </div>
      <BottomContent />
      <CircleButton onClick={onClick}>
        <Svg
          type="arrowTop"
          className={styles.buttonImage}
        />
      </CircleButton>
    </footer>
  );
};

export default React.memo(DefaultFooter);
