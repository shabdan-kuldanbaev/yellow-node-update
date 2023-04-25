import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { CASE_STUDIES_SLUGS } from 'utils/constants';

const CaseStudiesFooterRefactored = dynamic(() => import('UI/sections/CaseStudiesFooter'));
const DefaultFooter = dynamic(() => import('./DefaultFooter'));

const Footer = () => {
  const { query: { project }, pathname } = useRouter();

  if (CASE_STUDIES_SLUGS.includes(project)) {
    return (
      <CaseStudiesFooterRefactored
        pathname={pathname}
        type={project}
      />
    );
  }

  return <DefaultFooter />;
};

export default Footer;
