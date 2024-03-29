import dynamic from 'next/dynamic';
import { CASE_STUDIES_SLUGS } from 'utils/constants';
import { useSearchParams, usePathname } from 'next/navigation';
import { routes } from 'utils/routes';

const CaseStudiesFooter = dynamic(() => import('UI/sections/CaseStudiesFooter'));
const DefaultFooter = dynamic(() => import('./DefaultFooter'));

const pagesWithoutFooter = [
  routes.aiSoftwareDevelopmentServices.path,
];

const Footer = () => {
  const pathname = usePathname();
  const { project } = useSearchParams();

  if (pagesWithoutFooter.includes(pathname)) {
    return null;
  }

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
