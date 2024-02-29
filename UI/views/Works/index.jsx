'use client';

import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import FullLayout from 'components/Layout/FullLayout';
import FullScreenEstimation from 'components/Common/FullScreenEstimation';
import PageHeader from 'UI/components/PageHeader';
import { REVEAL_ANIMATION_PROPS } from 'utils/constants';
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
    introSection,
    works,
    initialWorksList,
    link,
    isFullscreenEstimation,
    tags,
    types,
    children,
    openFullscreenEstimation,
    closeFullscreenEstimation,
  } = useProps(props);

  return (
    <>
      {children}
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

        <Works
          works={works}
          initialWorksList={initialWorksList}
          tags={tags}
          types={types}
        />

        {link && (
          <Animated {...REVEAL_ANIMATION_PROPS}>
            <CallToAction
              data={link}
              handleOnClick={openFullscreenEstimation}
              className={styles.callToAction}
            />
          </Animated>
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
  pageMetadata: PropTypes.instanceOf(Object).isRequired,
  works: PropTypes.instanceOf(Array).isRequired,
  initialWorksList: PropTypes.instanceOf(Array).isRequired,
  link: PropTypes.instanceOf(Object).isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default WorksView;
