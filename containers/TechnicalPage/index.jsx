import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectComponents, selectMetaData } from 'redux/selectors/layout';
import MetaTags from 'components/Common/MetaTags';
import PageHeader from 'components/Common/PageHeader';
import FullLayout from 'components/Layout/FullLayout';
import ContentfulParser from 'components/BlogCommon/Article/ContentfulParser';
import { rootUrl } from 'utils/helper';
import { pagesBreadcrumbs } from 'utils/breadcrumbs';
import styles from './styles.module.scss';

const TechnicalPageContainer = ({
  introSection,
  type,
  title,
}) => {
  const pageData = useSelector(selectComponents);
  const metaData = useSelector(selectMetaData);

  const { main: contentModules } = pageData;

  const breadcrumbs = pagesBreadcrumbs.technicalPage(type);
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
        <div className={styles.container}>
          <ContentfulParser document={contentModules[0].fields.text} />
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
