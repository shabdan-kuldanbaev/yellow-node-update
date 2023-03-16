import React, {
  useCallback,
  useState,
  Suspense,
} from 'react';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import FullLayout from 'components/Layout/FullLayout';
import FullScreenEstimation from 'components/Common/FullScreenEstimation';
import MetaTags from 'components/Common/MetaTags';
import PageHeader from 'components/Common/PageHeader';
import Portfolio from 'components/PortfolioCommon';
import {
  PAGES,
  REVEAL_ANIMATION_PROPS,
  ROUTES,
} from 'utils/constants';
import { pagesBreadcrumbs } from 'utils/breadcrumbs';
import styles from './styles.module.scss';

const Animated = dynamic(() => import('UI/containers/Animated'));
const CallToAction = dynamic(() => import('components/Common/CallToAction'), { suspense: true });

const PortfolioContainer = ({
  introSection,
  pageMetadata,
  works,
  subtitle,
  link,
}) => {
  const [isFullscreenEstimation, setIsFullscreenEstimation] = useState(false);
  const breadcrumbs = pagesBreadcrumbs.portfolio();

  const openFullscreenEstimation = useCallback(() => setIsFullscreenEstimation(true), []);
  const closeFullscreenEstimation = useCallback(() => setIsFullscreenEstimation(false), []);

  return (
    <>
      <MetaTags
        page={PAGES.portfolio}
        breadcrumbs={breadcrumbs}
        pageMetadata={pageMetadata}
      />
      <FullLayout introSection={introSection}>
        <PageHeader
          title={ROUTES.portfolio.title}
          breadcrumbs={breadcrumbs}
          breadcrumbsTheme="dark"
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
        {link && (
          <Suspense>
            <CallToAction
              type="page"
              title={link.title}
              buttonTitle={link.buttonTitle}
              handleOnClick={openFullscreenEstimation}
              className={styles.callToAction}
            />
          </Suspense>
        )}
      </FullLayout>
      <FullScreenEstimation
        isFullscreenEstimation={isFullscreenEstimation}
        closeFullscreenEstimation={closeFullscreenEstimation}
      />
    </>
  );
};

PortfolioContainer.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  pageMetadata: PropTypes.instanceOf(Object).isRequired,
  works: PropTypes.instanceOf(Array).isRequired,
  link: PropTypes.instanceOf(Object).isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default PortfolioContainer;
