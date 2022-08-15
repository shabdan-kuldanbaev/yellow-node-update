import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Animated from 'components/Common/Animated';
import MetaTags from 'components/Common/MetaTags';
import PageHeader from 'components/Common/PageHeader';
import FullLayout from 'components/Layout/FullLayout';
import ContentfulParser from 'components/BlogCommon/Article/ContentfulParser';
import { ANIMATED_TYPE } from 'utils/constants';
import { rootUrl } from 'utils/helper';
import { pagesBreadcrumbs } from 'utils/breadcrumbs';
import { selectComponents, selectMetaData } from 'redux/selectors/layout';
import styles from './styles.module.scss';

const TechnicalPageContainer = ({
  pageData,
  metaData,
  introSection,
  type,
  title,
}) => {
  const { main: contentModules } = pageData;

  const breadcrumbs = pagesBreadcrumbs.privacyPolicy();
  const pageMetadata = {
    ...metaData,
    url: `${rootUrl}/privacy-policy`,
  };

  if (!pageData || !contentModules) {
    return null;
  }

  return (
    <>
      <MetaTags
        page={type}
        pageMetadata={pageMetadata}
        breadcrumbs={breadcrumbs}
      />
      <FullLayout introSection={introSection}>
        <PageHeader
          title={title}
          breadcrumbs={breadcrumbs}
          updatedAt={contentModules[0].sys.updatedAt}
        />
        <Animated
          type={ANIMATED_TYPE.isCustom}
          translateY="2.82352941em"
          opasityDuration={1}
          transformDuration={1}
          transitionDelay={250}
        >
          <div className={styles.container}>
            <ContentfulParser document={contentModules[0].fields.text} />
          </div>
        </Animated>
      </FullLayout>
    </>
  );
};

TechnicalPageContainer.propTypes = {
  pageData: PropTypes.instanceOf(Object).isRequired,
  introSection: PropTypes.instanceOf(Object).isRequired,
  metaData: PropTypes.shape({
    metaTitle: PropTypes.string,
    metaDescription: PropTypes.string,
    ogImage: PropTypes.string,
  }).isRequired,
  type: PropTypes.string.isRequired,
};

export default connect(
  (state) => ({
    pageData: selectComponents(state),
    metaData: selectMetaData(state),
  }),
)(TechnicalPageContainer);
