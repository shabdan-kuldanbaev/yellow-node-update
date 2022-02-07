import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectComponents, selectMetaData } from 'redux/selectors/layout';
import { PageHeader } from 'components/Common/PageHeader';
import { MetaTags } from 'components/Common/MetaTags';
import { FullScreenEstimation } from 'components/Common/FullScreenEstimation';
import { AppDevelopmentCommon } from 'components/AppDevelopmentCommon';
import { getDocumentFields, rootUrl } from 'utils/helper';
import { CONTACT_FORM_TITLES, PAGES } from 'utils/constants';
import { useRouter } from 'next/router';
import cn from 'classnames';
import { FeedbackFormContainer } from 'containers/Home/FeedbackForm';
import styles from './styles.module.scss';
import { getServicePageInfo } from './utils/servicePageHelper';

const CustomServiceContainer = ({
  pageData,
  metaData,
  introSection,
}) => {
  const { pathname: rawPathname } = useRouter();
  const pathname = rawPathname.slice(1);

  const [isFullscreenEstimation, setIsFullscreenEstimation] = useState(false);

  const { main: contentModules, hasFeedbackForm } = pageData;

  const { pageMicrodata, breadcrumbs } = getServicePageInfo(pathname);
  const pageMetadata = { ...metaData, url: `${rootUrl}/${pathname}` };

  const breadcrumbsTheme = [
    PAGES.customMobileApp,
    PAGES.customChatApp,
  ].includes(pathname) ? 'dark' : null;
  const openFullscreenEstimation = () => setIsFullscreenEstimation(true);
  const closeFullscreenEstimation = () => setIsFullscreenEstimation(false);

  if (!pageData || !contentModules) {
    return null;
  }

  return (
    <Fragment>
      <MetaTags
        page={pathname}
        pageMetadata={pageMetadata}
        pageMicrodata={pageMicrodata}
        breadcrumbs={breadcrumbs}
      />
      <div className={cn(styles.container, {
        [styles.webApp]: pathname === PAGES.customWebApp,
        [styles.iosDevelopment]: pathname === PAGES.developmentServices,
        [styles.chatApp]: pathname === PAGES.customChatApp,
        [styles.androidDevelopmentServices]: pathname === PAGES.androidDevelopmentServices,
      })}
      >
        <PageHeader
          breadcrumbs={breadcrumbs}
          titleStyles={styles.pageTitle}
          breadcrumbsStyles={styles.breadcrumbs}
          breadcrumbsTheme={breadcrumbsTheme}
        />
        {contentModules.map((module) => {
          const { type: sectionType, view } = getDocumentFields(module);

          return (
            <AppDevelopmentCommon
              key={`${pathname}/${sectionType}-${view || ''}`}
              section={module}
              handleOnCTAClick={openFullscreenEstimation}
              type={pathname}
              introSection={introSection}
            />
          );
        })}
        {hasFeedbackForm && (
          <div className={styles[pathname] || styles.feedBackContainer}>
            <FeedbackFormContainer
              type={pathname}
              title={CONTACT_FORM_TITLES[pathname]}
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

CustomServiceContainer.propTypes = {
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
)(CustomServiceContainer);
