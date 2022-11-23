import React from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { CASE_STUDIES_SLUGS } from 'utils/constants';

const CaseStudiesFooter = dynamic(() => import('components/CaseStudiesCommon/CaseStudiesFooter'));
const DefaultFooter = dynamic(() => import('./DefaultFooter'));

const Footer = () => {
  const { query: { project }, pathname } = useRouter();

  if (CASE_STUDIES_SLUGS.includes(project)) {
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
