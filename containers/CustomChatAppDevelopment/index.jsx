import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectComponents } from 'redux/selectors/layout';
import { PageHeader } from 'components/Common/PageHeader';
import { MetaTags } from 'components/Common/MetaTags';
import { ChatAppCommon } from 'components/CustomChatAppCommon/ChatAppCommon';
import { FullLayout } from 'components/Layout/FullLayout';
import { pagesBreadcrumbs } from 'utils/breadcrumbs';
import { microdata } from 'utils/microdata';
import { PAGES } from 'utils/constants';

const CustomChatAppContainer = ({ pageData }) => {
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
        {contentModules.map((module) => <ChatAppCommon section={module} />)}
      </FullLayout>
    </Fragment>
  );
};

CustomChatAppContainer.propTypes = {
  pageData: PropTypes.instanceOf(Object).isRequired,
};

export default connect(
  (state) => ({ pageData: selectComponents(state) }),
)(CustomChatAppContainer);
