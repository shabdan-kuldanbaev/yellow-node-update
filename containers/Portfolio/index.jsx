import React, {
  Fragment,
  useCallback,
  useMemo,
  useState,
} from 'react';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {
  selectCTA,
  selectMetaData,
  selectPortfolioProjectsPreview,
  selectSubtitle,
} from 'redux/selectors/layout';
import Animated from 'components/Common/Animated';
import FullLayout from 'components/Layout/FullLayout';
import FullScreenEstimation from 'components/Common/FullScreenEstimation';
import MetaTags from 'components/Common/MetaTags';
import PageHeader from 'components/Common/PageHeader';
import Portfolio from 'components/PortfolioCommon';
import { getDocumentFields, rootUrl } from 'utils/helper';
import {
  PAGES,
  REVEAL_ANIMATION_PROPS,
  ROUTES,
} from 'utils/constants';
import { pagesBreadcrumbs } from 'utils/breadcrumbs';
import styles from './styles.module.scss';

const CallToAction = dynamic(() => import('components/Common/CallToAction'));

function PortfolioContainer({ introSection }) {
  const portfolioProjects = useSelector(selectPortfolioProjectsPreview);
  const metaData = useSelector(selectMetaData);
  const subtitle = useSelector(selectSubtitle);
  const linkCTA = useSelector(selectCTA);

  const [isFullscreenEstimation, setIsFullscreenEstimation] = useState(false);

  const { contentModules } = getDocumentFields(portfolioProjects, ['contentModules']);
  const works = contentModules?.map((module) => {
    const {
      types,
      tags,
      ...rest
    } = getDocumentFields(module, ['title', 'description', 'types', 'tags', 'previewImage', 'backgroundImage', 'slug']);

    return {
      types: types?.map((type) => getDocumentFields(type, ['slug', 'displayName'])) ?? [],
      tags: tags?.map((tag) => getDocumentFields(tag, ['slug', 'title'])) ?? [],
      ...rest,
    };
  });

  const link = useMemo(() => getDocumentFields(linkCTA), [linkCTA]);

  const breadcrumbs = pagesBreadcrumbs.portfolio();
  const pageMetadata = {
    ...metaData,
    url: `${rootUrl}/works`,
  };

  const openFullscreenEstimation = useCallback(() => setIsFullscreenEstimation(true), []);
  const closeFullscreenEstimation = useCallback(() => setIsFullscreenEstimation(false), []);

  return (
    <Fragment>
      <MetaTags
        page={PAGES.portfolio}
        breadcrumbs={breadcrumbs}
        pageMetadata={pageMetadata}
      />
      <FullLayout introSection={introSection}>
        <PageHeader
          title={ROUTES.portfolio.title}
          breadcrumbs={breadcrumbs}
        />
        <Animated
          {...REVEAL_ANIMATION_PROPS}
          transitionDelay={250}
        >
          <p className={styles.subtitle}>
            {subtitle}
          </p>
        </Animated>
        <Portfolio works={works} />
        {(link && CallToAction) && (
          <CallToAction
            type="page"
            title={link.title}
            buttonTitle={link.buttonTitle}
            handleOnClick={openFullscreenEstimation}
            className={styles.callToAction}
          />
        )}
      </FullLayout>
      <FullScreenEstimation
        isFullscreenEstimation={isFullscreenEstimation}
        closeFullscreenEstimation={closeFullscreenEstimation}
      />
    </Fragment>
  );
}

PortfolioContainer.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
};

export default PortfolioContainer;
