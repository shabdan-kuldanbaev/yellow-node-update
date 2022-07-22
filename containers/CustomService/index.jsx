import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import { selectComponents, selectMetaData } from 'redux/selectors/layout';
import PageHeader from 'components/Common/PageHeader';
import MetaTags from 'components/Common/MetaTags';
import { AppDevelopmentCommon } from 'components/AppDevelopmentCommon';
import { getDocumentFields, rootUrl } from 'utils/helper';
import { CONTACT_FORM_TITLES, PAGES_WITH_DARK_BREADCRUMBS } from 'utils/constants';
import { getServicePageInfo } from './utils/servicePageHelper';
import styles from './styles.module.scss';

const FeedbackFormContainer = dynamic(() => import('containers/Home/FeedbackForm'));
const FullScreenEstimation = dynamic(() => import('components/Common/FullScreenEstimation'));

const CustomServiceContainer = ({ introSection, type }) => {
  const pageData = useSelector(selectComponents);
  const metaData = useSelector(selectMetaData);
  const [isFullscreenEstimation, setIsFullscreenEstimation] = useState(false);

  const { main: contentModules, hasFeedbackForm } = pageData;

  const { pageMicrodata, breadcrumbs } = getServicePageInfo(type);
  const pageMetadata = { ...metaData, url: `${rootUrl}/${type}` };

  const breadcrumbsTheme = PAGES_WITH_DARK_BREADCRUMBS.includes(type) ? 'dark' : null;
  const openFullscreenEstimation = () => setIsFullscreenEstimation(true);
  const closeFullscreenEstimation = () => setIsFullscreenEstimation(false);

  if (!pageData || !contentModules) {
    return null;
  }

  return (
    <Fragment>
      <MetaTags
        page={type}
        pageMetadata={pageMetadata}
        pageMicrodata={pageMicrodata}
        breadcrumbs={breadcrumbs}
      />
      <div className={cn(styles.container, styles[type])}>
        <PageHeader
          breadcrumbs={breadcrumbs}
          titleStyles={styles.pageTitle}
          breadcrumbsStyles={styles.breadcrumbs}
          breadcrumbsTheme={breadcrumbsTheme}
        />
        {contentModules?.map((module) => {
          const { type: sectionType, view } = getDocumentFields(module);

          return (
            <AppDevelopmentCommon
              key={`${type}/${sectionType}-${view || ''}`}
              section={module}
              handleOnCTAClick={openFullscreenEstimation}
              type={type}
              introSection={introSection}
            />
          );
        })}
        {hasFeedbackForm && (
          <div className={cn(styles[type], styles.feedbackContainer)}>
            <FeedbackFormContainer
              type={type}
              title={CONTACT_FORM_TITLES[type]}
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
  type: PropTypes.string.isRequired,
};

export default CustomServiceContainer;
