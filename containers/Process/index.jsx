import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectProcessPage } from 'redux/selectors/process';
import { selectMetaData } from 'redux/selectors/layout';
import {
  Process,
  MetaTags,
  PageHeader,
  FullLayout,
} from 'components';
import { PAGES, ROUTES } from 'utils/constants';
import { rootUrl } from 'utils/helper';
import { pagesBreadcrumbs } from 'utils/breadcrumbs';

const ProcessContainer = ({
  introSection,
  processes: { json },
  metaData: {
    metaTitle,
    metaDescription,
  },
}) => {
  const breadcrumbs = pagesBreadcrumbs.process();
  const pageMetadata = {
    metaTitle,
    metaDescription,
    url: `${rootUrl}/process`,
  };

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
        <Process processes={json} />
      </FullLayout>
    </Fragment>
  );
};

ProcessContainer.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  processes: PropTypes.instanceOf(Object).isRequired,
  metaData: PropTypes.shape({
    metaTitle: PropTypes.string,
    metaDescription: PropTypes.string,
  }).isRequired,
};

export default connect(
  (state) => ({
    processes: selectProcessPage(state),
    metaData: selectMetaData(state),
  }),
)(ProcessContainer);
