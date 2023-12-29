import dynamic from 'next/dynamic';
import AboutUs from 'components/CompanyCommon/AboutUs';
import WhatMakesUsSpecial from 'components/CompanyCommon/WhatMakesUsSpecial';
import MetaTags from 'components/Common/MetaTags';
import PageHeader from 'UI/components/PageHeader';
import { BLOCKS_SLUGS, PAGES, ROUTES } from 'utils/constants';
import { findBlock, getDocumentFields, rootUrl } from 'utils/helper';
import { getBreadcrumbs } from 'utils/breadcrumbs';
import { useFetchPageQuery } from 'redux/apis/page';
import styles from './styles.module.scss';

const ManagementTeam = dynamic(() => import('components/CompanyCommon/ManagementTeam'));
const PhotoGallery = dynamic(() => import('components/Common/PhotoGallery'));
const ReviewsSection = dynamic(() => import('UI/sections/ReviewsSection'));

const CompanyContainer = ({ type }) => {
  const { data = {} } = useFetchPageQuery(type);
  const {
    contentModules,
    metaData,
  } = data;

  const photosData = findBlock(contentModules, BLOCKS_SLUGS.imageCarousel);
  const managementTeam = findBlock(contentModules, BLOCKS_SLUGS.compnayPageManagementTeam);
  const whatMakesSpecial = findBlock(contentModules, BLOCKS_SLUGS.companyPageWhatMakesSpecial);
  const companyReviews = findBlock(contentModules, BLOCKS_SLUGS.companyReviews);

  const { contentModules: teamContent } = getDocumentFields(managementTeam, ['contentModules']);
  const { contentModules: specialThingsContent } = getDocumentFields(whatMakesSpecial, ['contentModules']);
  const breadcrumbs = getBreadcrumbs(PAGES.company);
  const pageMetadata = {
    ...metaData,
    url: `${rootUrl}/company`,
  };

  return (
    <>
      <MetaTags
        page={PAGES.company}
        pageMetadata={pageMetadata}
        breadcrumbs={breadcrumbs}
      />
      <main className={styles.main}>
        <PageHeader
          breadcrumbsTheme="dark"
          breadcrumbsStyles={styles.breadcrumbsStyles}
          titleStyles={styles.titleStyles}
          title={ROUTES.company.title}
          breadcrumbs={breadcrumbs}
        />
        <AboutUs />
        <WhatMakesUsSpecial makingUsSpecial={specialThingsContent} />
        <ManagementTeam managementTeam={teamContent} />
        <PhotoGallery sectionData={photosData} />
        <ReviewsSection
          section={companyReviews}
          type="company-reviews"
        />
      </main>
    </>
  );
};

export default CompanyContainer;
