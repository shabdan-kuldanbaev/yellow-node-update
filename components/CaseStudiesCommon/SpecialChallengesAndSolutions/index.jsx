import React from 'react';
import PropTypes from 'prop-types';
import SectionTitle from 'components/CaseStudiesCommon/SectionTitle';
import ChallengesAndSolutions from 'components/CaseStudiesCommon/ChallengesAndSolutions';
import { getBackgroundStyle } from './utils/challengesHelper';
import styles from './styles.module.scss';

const SpecialChallengesAndSolutions = ({ data, type }) => {
  const sectionBackgroundImage = getBackgroundStyle(type, data);

  return (
    <section
      className={styles[type]}
      style={sectionBackgroundImage}
    >
      <SectionTitle
        data={data}
        type={type}
      />
      <ChallengesAndSolutions
        data={data}
        type={type}
        isSpecial
      />
    </section>
  );
};

ChallengesAndSolutions.defaultProps = {
  type: '',
};

ChallengesAndSolutions.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string,
};

export default SpecialChallengesAndSolutions;
