import React from 'react';
import PropTypes from 'prop-types';
import { Contacts, ButtonMore } from 'components';
import Nav from 'components/Layout/Header/Nav';
import styles from './styles.module.scss';

export const Footer = ({ theme }) => (
  <footer className={styles.footer}>
    <div className={styles.forms}>
      <Contacts />
      <div className={styles.footerNav}>
        <Nav
          theme={theme}
          currentPage=""
          isAdditional={false}
        />
        <ButtonMore
          href="/"
          title="Stay tuned for our updates"
          buttonStyle={styles.button}
        />
      </div>
    </div>
  </footer>
);

Footer.defaultProps = {
  theme: 'dark',
};

Footer.propTypes = {
  theme: PropTypes.string,
};
