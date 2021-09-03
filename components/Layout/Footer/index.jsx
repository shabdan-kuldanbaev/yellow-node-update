import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import ButtonMore from 'components/Common/ButtonMore';
import Contacts from 'components/Layout/Footer/Contacts';
import CaseStudiesFooter from 'components/CaseStudiesCommon/CaseStudiesFooter';
import Nav from 'components/Layout/Header/Nav';
import { CASE_STUDIES_SLUGS } from 'utils/constants';
import styles from './styles.module.scss';

export const Footer = ({ theme, openFullscreenEstimation }) => {
  const { query: { project }, pathname } = useRouter();

  if (CASE_STUDIES_SLUGS.includes(project)) {
    return (
      <CaseStudiesFooter
        pathname={pathname}
        type={project}
      />
    );
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.forms}>
        <Contacts handleOnClick={openFullscreenEstimation} />
        <div className={styles.footerNav}>
          <Nav
            theme={theme}
            currentPage=""
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
};

Footer.propTypes = {
  theme: PropTypes.string,
  openFullscreenEstimation: PropTypes.func.isRequired,
};
