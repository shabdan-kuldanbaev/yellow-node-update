import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import FullLayout from 'components/Layout/FullLayout';
import FullScreenEstimation from 'components/Common/FullScreenEstimation';
import MetaTags from 'components/Common/MetaTags';
import PageHeader from 'UI/components/PageHeader';
import { PAGES, REVEAL_ANIMATION_PROPS } from 'utils/constants';
import CallToAction from 'UI/components/CallToAction';
import Works from 'UI/sections/Works';
import useProps from './utils/useProps';
import styles from './styles.module.scss';

const Animated = dynamic(() => import('UI/containers/Animated'));

const WorksView = (props) => {
  const {
    title,
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
      <FullLayout
        introSection={introSection}
        className={styles.view}
      >
        <PageHeader
          title={title}
          breadcrumbs={breadcrumbs}
          breadcrumbsTheme="dark"
          titleStyles={styles.title}
        />

        <Animated {...REVEAL_ANIMATION_PROPS}>
          <p className={styles.subtitle}>
            {subtitle}
          </p>
        </Animated>

        <Works works={works} />

        <Animated {...REVEAL_ANIMATION_PROPS}>
          <CallToAction
            data={link}
            handleOnClick={openFullscreenEstimation}
            className={styles.callToAction}
          />
        </Animated>
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
