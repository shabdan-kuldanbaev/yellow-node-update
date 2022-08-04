import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectComponents, selectMetaData } from 'redux/selectors/layout';
import FullScreenEstimation from 'components/Common/FullScreenEstimation';
import MetaTags from 'components/Common/MetaTags';
import PageHeader from 'components/Common/PageHeader';
import { AppDevelopmentCommon } from 'components/AppDevelopmentCommon';
import { pagesBreadcrumbs } from 'utils/breadcrumbs';
import { PAGES } from 'utils/constants';
import { getDocumentFields, rootUrl } from 'utils/helper';
import { microdata } from 'utils/microdata';
import styles from './styles.module.scss';

const IOSDevelopmentContainer = ({
  introSection,
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
        {contentModules.map((module) => {
          const { type: sectionType, view } = getDocumentFields(module);

          return (
            <AppDevelopmentCommon
              key={`${PAGES.developmentServices}/${sectionType}/${view || ''}`}
              introSection={introSection}
              section={module}
              handleOnCTAClick={openFullscreenEstimation}
              type={PAGES.developmentServices}
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

IOSDevelopmentContainer.propTypes = {
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
)(IOSDevelopmentContainer);
