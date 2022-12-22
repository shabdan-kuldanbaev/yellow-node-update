import React from 'react';
import PropTypes from 'prop-types';
import MetaTags from 'components/Common/MetaTags';
import PageHeader from 'components/Common/PageHeader';
import FullScreenEstimation from 'components/Common/FullScreenEstimation';
import FullLayout from 'components/Layout/FullLayout';
import Process from 'UI/components/ProcessList';
import { PAGES, ROUTES } from 'utils/constants';
import { useProcess } from './utils/useProcess';

const ProcessContainer = (props) => {
  const {
    json,
    breadcrumbs,
    pageMetadata,
    introSection,
    isFullscreenEstimation,
    openFullscreenEstimation,
    closeFullscreenEstimation,
  } = useProcess(props);

  return (
    <>
      <MetaTags
        page={PAGES.process}
        pageMetadata={pageMetadata}
        breadcrumbs={breadcrumbs}
      />
      <FullLayout introSection={introSection}>
        <PageHeader
          title={ROUTES.process.title}
          breadcrumbs={breadcrumbs}
        />
        <Process
          processes={json}
          handleOnCTAClick={openFullscreenEstimation}
        />
      </FullLayout>
      <FullScreenEstimation
        isFullscreenEstimation={isFullscreenEstimation}
        closeFullscreenEstimation={closeFullscreenEstimation}
      />
    </>
  );
};

ProcessContainer.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  json: PropTypes.instanceOf(Object).isRequired,
};

export default ProcessContainer;
