import React from 'react';
import PropTypes from 'prop-types';
import ButtonMore from 'components/Common/ButtonMore';
import Contacts from 'components/Layout/Footer/Contacts';
import CaseStudiesFooter from 'components/CaseStudiesCommon/CaseStudiesFooter';
import Nav from 'components/Layout/Header/Nav';
import { CASE_STUDIES_SLUGS } from 'utils/constants';
import styles from './styles.module.scss';

export const Footer = ({
  type,
  theme,
  openFullscreenEstimation,
}) => {
  if (CASE_STUDIES_SLUGS.includes(type)) {
    return <CaseStudiesFooter type={type} />;
  }

  return (
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
};

Footer.defaultProps = {
  theme: 'dark',
  type: '',
};

Footer.propTypes = {
  type: PropTypes.string,
  theme: PropTypes.string,
  openFullscreenEstimation: PropTypes.func.isRequired,
};
