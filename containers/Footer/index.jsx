import React from 'react';
import { FeedbackForm, Contacts } from 'components';

import styles from './styles.module.scss';

const Footer = () => (
  <footer className={styles.footer}>
    <FeedbackForm />
    <Contacts />
  </footer>
);

export default Footer;
