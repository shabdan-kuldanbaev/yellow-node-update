import { FullScreenEstimation, MetaTags, PageHeader } from 'components';
import { AppDevelopmentCommon } from 'components/AppDevelopmentCommon';
import styles from 'containers/CustomWebAppDevelopment/styles.module.scss';
import { FeedbackFormContainer } from 'containers/Home/FeedbackForm';
import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { selectComponents, selectMetaData } from 'redux/selectors/layout';
import { pagesBreadcrumbs } from 'utils/breadcrumbs';
import { PAGES } from 'utils/constants';
import { rootUrl } from 'utils/helper';
import { microdata } from 'utils/microdata';

const IOSDevelopmentContainer = ({
  pageData,
  metaData: {
    metaTitle,
    metaDescription,
  },
}) => {
  const [isFullscreenEstimation, setIsFullscreenEstimation] = useState(false);
  const breadcrumbs = pagesBreadcrumbs.developmentServices();
  const { main: contentModules } = pageData;
  const pageMetadata = {
    metaTitle,
    metaDescription,
    url: `${rootUrl}/${PAGES.developmentServices}`,
  };

  const openFullscreenEstimation = () => setIsFullscreenEstimation(true);
  const closeFullscreenEstimation = () => setIsFullscreenEstimation(false);

  if (!pageData || !contentModules) {
    return null;
  }

  return (
    <Fragment>
      <MetaTags
        page={PAGES.developmentServices}
        pageMetadata={pageMetadata}
        pageMicrodata={microdata.customIOSApp()}
        breadcrumbs={breadcrumbs}
      />
      <div className={styles.сontainer}>
        <PageHeader
          breadcrumbs={breadcrumbs}
          titleStyles={styles.pageTitle}
          breadcrumbsStyles={styles.breadcrumbs}
          breadcrumbsTheme="dark"
        />
        {contentModules.map((module) => (
          <AppDevelopmentCommon
            section={module}
            handleOnCTAClick={openFullscreenEstimation}
            type={PAGES.customWebApp}
          />
        ))}
      </div>
      <FullScreenEstimation
        isFullscreenEstimation={isFullscreenEstimation}
        closeFullscreenEstimation={closeFullscreenEstimation}
      />
    </Fragment>
  );
};

export default connect(
  (state) => ({
    pageData: selectComponents(state),
    metaData: selectMetaData(state),
  }),
)(IOSDevelopmentContainer);
