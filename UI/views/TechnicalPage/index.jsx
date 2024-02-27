'use client';

import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import MetaTags from 'components/Common/MetaTags';
import PageHeader from 'UI/components/PageHeader';
import ContentfulParser from 'components/BlogCommon/Article/ContentfulParser';
import FullLayout from 'components/Layout/FullLayout';
import { REVEAL_ANIMATION_PROPS } from 'utils/constants';
import useProps from './utils/useProps';
import styles from './styles.module.scss';

const Animated = dynamic(() => import('UI/containers/Animated'));

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
          <Animated
            {...REVEAL_ANIMATION_PROPS}
            percentIntersection={0}
          >
            <ContentfulParser document={text} />
          </Animated>
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
