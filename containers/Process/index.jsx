import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectProcessPage } from 'redux/selectors/process';
import { selectMetaData } from 'redux/selectors/layout';
import MetaTags from 'components/Common/MetaTags';
import PageHeader from 'components/Common/PageHeader';
import FullScreenEstimation from 'components/Common/FullScreenEstimation';
import FullLayout from 'components/Layout/FullLayout';
import Process from 'components/ProcessCommon';
import { PAGES, ROUTES } from 'utils/constants';
import { rootUrl } from 'utils/helper';
import { pagesBreadcrumbs } from 'utils/breadcrumbs';

const ProcessContainer = ({ introSection }) => {
  const { json } = useSelector(selectProcessPage);
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
    <Fragment>
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
    </Fragment>
  );
};

ProcessContainer.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
};

export default ProcessContainer;
