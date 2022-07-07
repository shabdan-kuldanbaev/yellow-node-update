import React from 'react';
import { SideContent } from './SideContent';
import { MainContent } from './MainContent';
import { BottomContent } from './BottomContent';
import styles from './styles.module.scss';

const DefaultFooter = () => (
  <footer className={styles.footerContainer}>
    <div className={styles.footer}>
      <SideContent />
      <MainContent />
    </div>
    <BottomContent />
  </footer>
);

export default DefaultFooter;
