import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectComponents } from 'redux/selectors/layout';
import { PageHeader } from 'components/Common/PageHeader';
import { MetaTags } from 'components/Common/MetaTags';
import { FullScreenEstimation } from 'components/Common/FullScreenEstimation';
import { ChatAppCommon } from 'components/CustomChatAppCommon';
import { FullLayout } from 'components/Layout/FullLayout';
import { pagesBreadcrumbs } from 'utils/breadcrumbs';
import { microdata } from 'utils/microdata';
import { PAGES } from 'utils/constants';

const CustomChatAppContainer = ({ pageData }) => {
  const [isFullscreenEstimation, setIsFullscreenEstimation] = useState(false);

  const openFullscreenEstimation = () => setIsFullscreenEstimation(true);
  const closeFullscreenEstimation = () => setIsFullscreenEstimation(false);
  const breadcrumbs = pagesBreadcrumbs.customChatApp();
  const {
    main: contentModules,
    // TODO remove meta data from const and use from contentful
    // metaTitle,
    // metaDescription,
  } = pageData;

  if (!pageData || !contentModules) {
    return null;
  }

  return (
    <Fragment>
      <MetaTags
        page={PAGES.customChatApp}
        pageMicrodata={microdata.customChatApp()}
        breadcrumbs={breadcrumbs}
      />
      <FullLayout>
        <PageHeader breadcrumbs={breadcrumbs} />
        {contentModules.map((module) => (
          <ChatAppCommon
            section={module}
            handleOnCTAClick={openFullscreenEstimation}
          />
        ))}
      </FullLayout>
      <FullScreenEstimation
        isFullscreenEstimation={isFullscreenEstimation}
        closeFullscreenEstimation={closeFullscreenEstimation}
      />
    </Fragment>
  );
};

CustomChatAppContainer.propTypes = {
  pageData: PropTypes.instanceOf(Object).isRequired,
};

export default connect(
  (state) => ({ pageData: selectComponents(state) }),
)(CustomChatAppContainer);
