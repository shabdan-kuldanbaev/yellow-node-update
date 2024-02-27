'use client';

import { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import dynamic from 'next/dynamic';
import PageHeader from 'UI/components/PageHeader';
import MetaTags from 'components/Common/MetaTags';
import { getDocumentFields, rootUrl } from 'utils/helper';
import { PAGES_WITH_DARK_BREADCRUMBS } from 'utils/constants';
import { getBreadcrumbs } from 'utils/breadcrumbs';
import { IntroSectionContext, PageClustersContext } from 'utils/appContext';
import styles from './styles.module.scss';

const FullScreenEstimation = dynamic(() => import('components/Common/FullScreenEstimation'), { ssr: false });
const AppDevelopmentCommon = dynamic(() => import('components/AppDevelopmentCommon').then((module) => module.AppDevelopmentCommon));

const CustomServiceContainer = ({ type, data = {}, metaData }) => {
  const { contentModules, clusters } = data;

  const introSection = useContext(IntroSectionContext);

  const { setPageClusters } = useContext(PageClustersContext);

  useEffect(() => {
    setPageClusters(clusters || []);
  }, [setPageClusters, clusters]);

  const [isFullscreenEstimation, setIsFullscreenEstimation] = useState(false);

  const breadcrumbs = getBreadcrumbs(type);
  const pageMetadata = { ...metaData, url: `${rootUrl}/${type}` };

  const breadcrumbsTheme = PAGES_WITH_DARK_BREADCRUMBS.includes(type) ? 'dark' : null;
  const openFullscreenEstimation = () => setIsFullscreenEstimation(true);
  const closeFullscreenEstimation = () => setIsFullscreenEstimation(false);

  if (!contentModules) {
    return null;
  }

  return (
    <>
      <MetaTags
        page={type}
        pageMetadata={pageMetadata}
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
          const { type: sectionType, view, slug } = getDocumentFields(module);

          return (
            <AppDevelopmentCommon
              key={`${type}/${sectionType}-${view || slug}`}
              section={module}
              handleOnCTAClick={openFullscreenEstimation}
              type={type}
              introSection={introSection}
            />
          );
        })}
      </div>
      <FullScreenEstimation
        isFullscreenEstimation={isFullscreenEstimation}
        closeFullscreenEstimation={closeFullscreenEstimation}
      />
    </>
  );
};

CustomServiceContainer.propTypes = {
  type: PropTypes.string.isRequired,
};

export default CustomServiceContainer;
