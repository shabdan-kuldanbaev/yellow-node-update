import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectComponents, selectMetaData } from 'redux/selectors/layout';
import { PageHeader } from 'components/Common/PageHeader';
import { MetaTags } from 'components/Common/MetaTags';
import { FullScreenEstimation } from 'components/Common/FullScreenEstimation';
import { ChatAppCommon } from 'components/CustomChatAppCommon';
import { FullLayout } from 'components/Layout/FullLayout';
import { pagesBreadcrumbs } from 'utils/breadcrumbs';
import { microdata } from 'utils/microdata';
import { rootUrl } from 'utils/helper';
import { PAGES } from 'utils/constants';

const CustomChatAppContainer = ({
  pageData,
  metaData: {
    metaTitle,
    metaDescription,
  },
}) => {
  const [isFullscreenEstimation, setIsFullscreenEstimation] = useState(false);
  const breadcrumbs = pagesBreadcrumbs.customChatApp();
  const { main: contentModules } = pageData;
  const pageMetadata = {
    metaTitle,
    metaDescription,
    url: `${rootUrl}/chat-app-development-company`,
  };

  const openFullscreenEstimation = () => setIsFullscreenEstimation(true);
  const closeFullscreenEstimation = () => setIsFullscreenEstimation(false);

  if (!pageData || !contentModules) {
    return null;
  }

  return (
    <Fragment>
      <MetaTags
        page={PAGES.customChatApp}
        pageMetadata={pageMetadata}
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
  metaData: PropTypes.shape({
    metaTitle: PropTypes.string,
    metaDescription: PropTypes.string,
  }).isRequired,
};

export default connect(
  (state) => ({
    pageData: selectComponents(state),
    metaData: selectMetaData(state),
  }),
)(CustomChatAppContainer);
