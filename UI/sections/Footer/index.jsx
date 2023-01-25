import React from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { CASE_STUDIES_SLUGS, REFACTORED_CASE_STUDIES_PAGES } from 'utils/constants';

const CaseStudiesFooter = dynamic(() => import('components/CaseStudiesCommon/CaseStudiesFooter'));
// TODO remove old components
const CaseStudiesFooterRefactored = dynamic(() => import('UI/sections/CaseStudiesFooter'));
const DefaultFooter = dynamic(() => import('./DefaultFooter'));

const Footer = () => {
  const { query: { project }, pathname } = useRouter();

  if (CASE_STUDIES_SLUGS.includes(project)) {
    if (REFACTORED_CASE_STUDIES_PAGES.includes(project)) {
      return (
        <CaseStudiesFooterRefactored
          pathname={pathname}
          type={project}
        />
      );
    }

    return (
      <CaseStudiesFooter
        pathname={pathname}
        type={project}
      />
    );
  }

  return <DefaultFooter />;
};

export default Footer;
