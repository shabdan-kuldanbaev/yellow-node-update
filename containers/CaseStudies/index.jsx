import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { selectProject } from 'redux/selectors/portfolio';
import CaseStudiesCommon from 'components/CaseStudiesCommon';
import { MetaTags } from 'components/Common/MetaTags';
import FeedbackForm from 'containers/Home/FeedbackForm';
import { getDocumentFields } from 'utils/helper';
import { PAGES } from 'utils/constants';
import styles from './styles.module.scss';

const CaseStudiesContainer = ({ introSection, currentProject }) => {
  const {
    slug,
    contentModules,
    metaTitle,
    metaDescription,
  } = getDocumentFields(
    get(currentProject, 'items[0]', {}),
    ['slug', 'contentModules'],
  );

  const projectMetadata = {
    metaTitle,
    metaDescription,
    slug,
  };

  return (
    <Fragment>
      <MetaTags
        page={PAGES.project}
        pageMetadata={projectMetadata}
      />
      {contentModules && contentModules.map(({ fields, sys }) => (
        <CaseStudiesCommon
          key={sys.id}
          type={slug}
          introSection={introSection}
          data={fields}
        />
      ))}
      <div className={styles.feedBackContainer}>
        <FeedbackForm />
      </div>
    </Fragment>
  );
};

CaseStudiesContainer.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  currentProject: PropTypes.instanceOf(Object).isRequired,
};

export default connect(
  (state) => ({ currentProject: selectProject(state) }),
)(CaseStudiesContainer);
