import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectComponents, selectMetaData } from 'redux/selectors/layout';
import { PageHeader } from 'components/Common/PageHeader';
import { MetaTags } from 'components/Common/MetaTags';
import { FullScreenEstimation } from 'components/Common/FullScreenEstimation';
import { AppDevelopmentCommon } from 'components/AppDevelopmentCommon';
import { pagesBreadcrumbs } from 'utils/breadcrumbs';
import { microdata } from 'utils/microdata';
import { rootUrl, getDocumentFields } from 'utils/helper';
import { PAGES } from 'utils/constants';
import { useRouter } from 'next/router';
import styles from './styles.module.scss';

const CustomServicesContainer = ({
  pageData,
  metaData,
}) => {
  const { pathname: rawPathname } = useRouter();
  const pathname = rawPathname.slice(1);

  const [isFullscreenEstimation, setIsFullscreenEstimation] = useState(false);

  const { main: contentModules } = pageData;

  const { pageMicrodata, breadcrumbs } = (() => {
    switch (pathname) {
    case PAGES.androidDevelopmentServices:
      return {
        pageMicrodata: microdata.customAndroidApp(),
        breadcrumbs: pagesBreadcrumbs.androidDevelopmentServices(),
      };

    case PAGES.developmentServices:
      return {
        pageMicrodata: microdata.customIOSApp(),
        breadcrumbs: pagesBreadcrumbs.developmentServices(),
      };

    case PAGES.customChatApp:
      return {
        pageMicrodata: microdata.customChatApp(),
        breadcrumbs: pagesBreadcrumbs.customChatApp(),
      };

    case PAGES.customMobileApp:
      return {
        pageMicrodata: microdata.customMobileApp(),
        breadcrumbs: pagesBreadcrumbs.customMobileApp(),
      };

    case PAGES.customWebApp:
      return {
        pageMicrodata: microdata.customWebApp(),
        breadcrumbs: pagesBreadcrumbs.customWebApp(),
      };

    case PAGES.designServices:
      return {
        pageMicrodata: microdata.designServices(),
        breadcrumbs: pagesBreadcrumbs.designServices(),
      };

    default:
      return {
        pageMicrodata: null,
        breadcrumbs: null,
      };
    }
  })();
  const pageMetadata = { ...metaData, url: `${rootUrl}/${pathname}` };

  const openFullscreenEstimation = () => setIsFullscreenEstimation(true);
  const closeFullscreenEstimation = () => setIsFullscreenEstimation(false);

  if (!pageData || !contentModules) {
    return null;
  }

  return (
    <Fragment>
      <MetaTags
        page={PAGES.customChatApp}
        pageMetadata={pageMetadata}
        pageMicrodata={pageMicrodata}
        breadcrumbs={breadcrumbs}
      />
      <div className={styles.container}>
        <PageHeader
          breadcrumbs={breadcrumbs}
          titleStyles={styles.pageTitle}
          breadcrumbsStyles={styles.breadcrumbs}
        />
        {contentModules.map((module) => {
          const { type: sectionType, view } = getDocumentFields(module);

          return (
            <AppDevelopmentCommon
              key={`${pathname}/${sectionType}-${view || ''}`}
              section={module}
              handleOnCTAClick={openFullscreenEstimation}
              type={pathname}
            />
          );
        })}
      </div>
      <FullScreenEstimation
        isFullscreenEstimation={isFullscreenEstimation}
        closeFullscreenEstimation={closeFullscreenEstimation}
      />
    </Fragment>
  );
};

CustomServicesContainer.propTypes = {
  pageData: PropTypes.instanceOf(Object).isRequired,
  metaData: PropTypes.shape({
    metaTitle: PropTypes.string,
    metaDescription: PropTypes.string,
  }).isRequired,
};

export default connect(
  (state) => ({
    pageData: selectComponents(state),
    metaData: selectMetaData(state),
  }),
)(CustomServicesContainer);
