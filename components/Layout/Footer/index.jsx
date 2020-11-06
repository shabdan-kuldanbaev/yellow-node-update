import React from 'react';
import PropTypes from 'prop-types';
import {
  Contacts,
  ButtonMore,
  FullScreenEstimation,
} from 'components';
import Nav from 'components/Layout/Header/Nav';
import styles from './styles.module.scss';

export const Footer = ({
  theme,
  openFullscreenEstimation,
  isFullscreenEstimation,
  closeFullscreenEstimation,
  handleOnClick,
}) => (
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
    <FullScreenEstimation
      isFullscreenEstimation={isFullscreenEstimation}
      closeFullscreenEstimation={closeFullscreenEstimation}
      handleOnClick={handleOnClick}
    />
  </footer>
);

Footer.defaultProps = {
  theme: 'dark',
};

Footer.propTypes = {
  theme: PropTypes.string,
  openFullscreenEstimation: PropTypes.func.isRequired,
  isFullscreenEstimation: PropTypes.bool.isRequired,
  closeFullscreenEstimation: PropTypes.func.isRequired,
  handleOnClick: PropTypes.func.isRequired,
};
