import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { selectProject } from 'redux/selectors/portfolio';
import CaseStudiesCommon from 'components/CaseStudiesCommon';
import SectionTitle from 'components/CaseStudiesCommon/SectionTitle';
import FeedbackForm from 'containers/Home/FeedbackForm';
import { getDocumentFields } from 'utils/helper';
import styles from './styles.module.scss';

const CaseStudiesContainer = ({ introSection, currentProject }) => {
  const { slug, contentModules } = getDocumentFields(get(currentProject, 'items[0]', {}));

  return (
    <Fragment>
      {contentModules && contentModules.map(({ fields, sys }) => (
        <CaseStudiesCommon
          key={sys.id}
          type={slug}
          introSection={introSection}
          data={fields}
        >
          <SectionTitle
            type={slug}
            data={fields}
          />
        </CaseStudiesCommon>
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
