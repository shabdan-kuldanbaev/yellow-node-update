import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Wireframes from 'components/CaseStudiesCommon/Wireframes';
import ChallengesAndSolutions from 'components/CaseStudiesCommon/ChallengesAndSolutions';

const ChallengesAndSolutionsWithWireframes = ({ data, type }) => (
  <Fragment>
    <ChallengesAndSolutions data={data} />
    <Wireframes
      data={data}
      type={type}
    />
  </Fragment>
);

ChallengesAndSolutions.defaultProps = {
  type: '',
};

ChallengesAndSolutions.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string,
};

export default ChallengesAndSolutionsWithWireframes;
