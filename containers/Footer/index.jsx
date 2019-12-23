import React, { useEffect, useRef } from 'react';
import { FeedbackForm, Contacts } from 'components';

import styles from './styles.module.scss';

const Footer = () => {
  const footerRef = useRef(null);
  const formsRef = useRef(null);
  let animateStartFrom = 1000;

  const handleOnScroll = () => {
    const footer = footerRef.current;
    const footerY = footer.getBoundingClientRect().top;
    
    if (footerY < animateStartFrom) {
      footer.style.opacity = (1 - footerY / (animateStartFrom / 2));
      formsRef.current.style.position = 'fixed';
    } else formsRef.current.style.position = 'relative';
  };

  useEffect(() => {
    animateStartFrom = window.innerHeight;
    window.addEventListener('scroll', handleOnScroll);

    return () => {
      window.removeEventListener('scroll', handleOnScroll);
    };
  }, []);

  return (
    <footer className={styles.footer} ref={footerRef}>
      <div className={styles.forms} ref={formsRef}>
        <FeedbackForm />
        <Contacts />
      </div>
    </footer>
  );
};

export default Footer;
