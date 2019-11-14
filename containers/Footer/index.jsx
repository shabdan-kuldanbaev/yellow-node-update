import React from 'react';
import { SectionTitle, FeedbackForm } from 'components';

import styles from './styles.module.scss';

const Footer = () => (
  <footer className={styles.footer}>
    <SectionTitle title="LET’S MOVE FORWARD" subtitle="We brainstorm, contribute, and grow your product together. Every step of the way. " />
    <FeedbackForm />
  </footer>
);

export default Footer;
