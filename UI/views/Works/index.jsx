import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import FullLayout from 'components/Layout/FullLayout';
import FullScreenEstimation from 'components/Common/FullScreenEstimation';
import MetaTags from 'components/Common/MetaTags';
import PageHeader from 'UI/components/PageHeader';
import Portfolio from 'components/PortfolioCommon';
import {
  PAGES,
  REVEAL_ANIMATION_PROPS,
  ROUTES,
} from 'utils/constants';
import useProps from './utils/useProps';
import styles from './styles.module.scss';

const Animated = dynamic(() => import('UI/containers/Animated'));
const CallToAction = dynamic(() => import('components/Common/CallToAction'));

const WorksView = (props) => {
  const {
    subtitle,
    breadcrumbs,
    pageMetadata,
    introSection,
    works,
    link,
    isFullscreenEstimation,
    openFullscreenEstimation,
    closeFullscreenEstimation,
  } = useProps(props);

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
          titleStyles={styles.title}
        />
        <Animated
          {...REVEAL_ANIMATION_PROPS}
          transitionDelay={50}
        >
          <p className={styles.subtitle}>
            {subtitle}
          </p>
        </Animated>
        <Portfolio works={works} />
        {link && (
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
    </>
  );
};

WorksView.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  pageMetadata: PropTypes.instanceOf(Object).isRequired,
  works: PropTypes.instanceOf(Array).isRequired,
  link: PropTypes.instanceOf(Object).isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default WorksView;
