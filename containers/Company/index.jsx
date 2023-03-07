import React from 'react';
import { useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import {
  selectManagementTeam,
  selectWhatMakesSpecial,
  selectImageCarousel,
  selectMetaData,
  selectCompanyReviews,
} from 'redux/selectors/layout';
import AboutUs from 'components/CompanyCommon/AboutUs';
import WhatMakesUsSpecial from 'components/CompanyCommon/WhatMakesUsSpecial';
import MetaTags from 'components/Common/MetaTags';
import PageHeader from 'components/Common/PageHeader';
import { PAGES, ROUTES } from 'utils/constants';
import { getDocumentFields, rootUrl } from 'utils/helper';
import { pagesBreadcrumbs } from 'utils/breadcrumbs';
import { microdata } from 'utils/microdata';
import styles from './styles.module.scss';

const ManagementTeam = dynamic(() => import('components/CompanyCommon/ManagementTeam'));
const PhotoGallery = dynamic(() => import('components/Common/PhotoGallery'));
const ReviewsSection = dynamic(() => import('UI/sections/ReviewsSection'));

const CompanyContainer = () => {
  const photosData = useSelector(selectImageCarousel);
  const managementTeam = useSelector(selectManagementTeam);
  const whatMakesSpecial = useSelector(selectWhatMakesSpecial);
  const metaData = useSelector(selectMetaData);
  const companyReviews = useSelector(selectCompanyReviews);

  const { contentModules: teamContent } = getDocumentFields(managementTeam, ['contentModules']);
  const { contentModules: specialThingsContent } = getDocumentFields(whatMakesSpecial, ['contentModules']);
  const breadcrumbs = pagesBreadcrumbs.company();
  const pageMetadata = {
    ...metaData,
    url: `${rootUrl}/company`,
  };

  return (
    <>
      <MetaTags
        page={PAGES.company}
        pageMetadata={pageMetadata}
        pageMicrodata={microdata.company()}
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
