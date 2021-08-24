import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectComponents, selectMetaData } from 'redux/selectors/layout';
import { FeedbackFormContainer } from 'containers/Home/FeedbackForm';
import { PageHeader } from 'components/Common/PageHeader';
import { MetaTags } from 'components/Common/MetaTags';
import { FullScreenEstimation } from 'components/Common/FullScreenEstimation';
import { AppDevelopmentCommon } from 'components/AppDevelopmentCommon';
import { pagesBreadcrumbs } from 'utils/breadcrumbs';
import { microdata } from 'utils/microdata';
import { rootUrl } from 'utils/helper';
import { PAGES } from 'utils/constants';
import styles from './styles.module.scss';

const CustomWebAppContainer = ({
  pageData,
  metaData: {
    metaTitle,
    metaDescription,
  },
  introSection,
}) => {
  const [isFullscreenEstimation, setIsFullscreenEstimation] = useState(false);
  const breadcrumbs = pagesBreadcrumbs.customWebApp();
  const { main: contentModules, hasFeedbackForm } = pageData;
  const pageMetadata = {
    metaTitle,
    metaDescription,
    url: `${rootUrl}/web-app-development-company`,
  };

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
        pageMicrodata={microdata.customWebApp()}
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
            type="web-app-development-company"
            introSection={introSection}
          />
        ))}
        {hasFeedbackForm && (
          <div className={styles['web-app-development-company'] || styles.feedBackContainer}>
            <FeedbackFormContainer
              type="web-app-development-company"
              title="Contact Yellow for a free estimation"
            />
          </div>
        )}
      </div>
      <FullScreenEstimation
        isFullscreenEstimation={isFullscreenEstimation}
        closeFullscreenEstimation={closeFullscreenEstimation}
      />
    </Fragment>
  );
};

CustomWebAppContainer.propTypes = {
  pageData: PropTypes.instanceOf(Object).isRequired,
  metaData: PropTypes.shape({
    metaTitle: PropTypes.string,
    metaDescription: PropTypes.string,
  }).isRequired,
  introSection: PropTypes.instanceOf(Object).isRequired,
};

export default connect(
  (state) => ({
    pageData: selectComponents(state),
    metaData: selectMetaData(state),
  }),
)(CustomWebAppContainer);
