import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectMetaData } from 'redux/selectors/layout';
import MetaTags from 'components/Common/MetaTags';
import PageHeader from 'components/Common/PageHeader';
import FullScreenEstimation from 'components/Common/FullScreenEstimation';
import FullLayout from 'components/Layout/FullLayout';
import Process from 'UI/components/ProcessList';
import { PAGES, ROUTES } from 'utils/constants';
import { rootUrl } from 'utils/helper';
import { pagesBreadcrumbs } from 'utils/breadcrumbs';

const ProcessContainer = ({ introSection, json }) => {
  const metaData = useSelector(selectMetaData);
  const [isFullscreenEstimation, setIsFullscreenEstimation] = useState(false);

  const breadcrumbs = pagesBreadcrumbs.process();
  const pageMetadata = {
    ...metaData,
    url: `${rootUrl}/process`,
  };

  const openFullscreenEstimation = () => setIsFullscreenEstimation(true);
  const closeFullscreenEstimation = () => setIsFullscreenEstimation(false);

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
