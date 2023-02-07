import React from 'react';
import PropTypes from 'prop-types';
import MetaTags from 'components/Common/MetaTags';
import PageHeader from 'components/Common/PageHeader';
import ContentfulParser from 'components/BlogCommon/Article/ContentfulParser';
import FullLayout from 'components/Layout/FullLayout';
import useProps from './utils/useProps';
import styles from './styles.module.scss';

const TechnicalPageContainer = (props) => {
  const {
    type,
    pageMetadata,
    breadcrumbs,
    title,
    updatedAt,
    text,
  } = useProps(props);

  return (
    <>
      <MetaTags
        page={type}
        pageMetadata={pageMetadata}
        breadcrumbs={breadcrumbs}
      />
      <FullLayout className={styles.container}>
        <PageHeader
          title={title}
          breadcrumbs={breadcrumbs}
          updatedAt={updatedAt}
          breadcrumbsTheme="dark"
          className={styles.titleStyle}
        />
        <div className={styles.container}>
          <ContentfulParser document={text} />
        </div>
      </FullLayout>
    </>
  );
};

TechnicalPageContainer.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};

export default TechnicalPageContainer;
