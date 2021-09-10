import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import CaseStudiesFooter from 'components/CaseStudiesCommon/CaseStudiesFooter';
import { CASE_STUDIES_SLUGS } from 'utils/constants';
import { SideContent } from './SideContent';
import { MainContent } from './MainContent';
import { BottomContent } from './BottomContent';
import styles from './styles.module.scss';

export const Footer = ({ theme }) => {
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
      <div className={styles.footerContainer}>
        <SideContent />
        <MainContent />
      </div>
      <BottomContent />
    </footer>
  );
};

Footer.defaultProps = {
  theme: 'dark',
};

Footer.propTypes = {
  theme: PropTypes.string,
};
