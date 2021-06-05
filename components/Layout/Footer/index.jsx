import React from 'react';
import PropTypes from 'prop-types';
import ButtonMore from 'components/Common/ButtonMore';
import Contacts from 'components/Layout/Footer/Contacts';
import Nav from 'components/Layout/Header/Nav';
import styles from './styles.module.scss';

export const Footer = ({ theme, openFullscreenEstimation }) => (
  <footer className={styles.footer}>
    <div className={styles.forms}>
      <Contacts handleOnClick={openFullscreenEstimation} />
      <div className={styles.footerNav}>
        <Nav
          theme={theme}
          currentPage=""
          isAdditional={false}
        />
        <ButtonMore
          title="Get an estimation"
          buttonStyle={styles.button}
          handleOnClick={openFullscreenEstimation}
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
  openFullscreenEstimation: PropTypes.func.isRequired,
};
