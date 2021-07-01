import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectComponents, selectMetaData } from 'redux/selectors/layout';
import { PageHeader } from 'components/Common/PageHeader';
import { MetaTags } from 'components/Common/MetaTags';
import { ChatAppCommon } from 'components/CustomChatAppCommon';
import { FullLayout } from 'components/Layout/FullLayout';
import { pagesBreadcrumbs } from 'utils/breadcrumbs';
import { microdata } from 'utils/microdata';
import { rootUrl } from 'utils/helper';
import { PAGES } from 'utils/constants';

const CustomChatAppContainer = ({ pageData, metaData }) => {
  const breadcrumbs = pagesBreadcrumbs.customChatApp();
  const { main: contentModules } = pageData;
  const { metaTitle, metaDescription } = metaData;
  const pageMetadata = {
    metaTitle,
    metaDescription,
    url: `${rootUrl}/chat-app-development-company`,
  };

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
        {contentModules.map((module) => <ChatAppCommon section={module} />)}
      </FullLayout>
    </Fragment>
  );
};

CustomChatAppContainer.propTypes = {
  pageData: PropTypes.instanceOf(Object).isRequired,
  metaData: PropTypes.instanceOf(Object).isRequired,
};

export default connect(
  (state) => ({
    pageData: selectComponents(state),
    metaData: selectMetaData(state),
  }),
)(CustomChatAppContainer);
