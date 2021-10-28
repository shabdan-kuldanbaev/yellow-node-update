import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import SectionTitle from 'components/CaseStudiesCommon/SectionTitle';
import ChallengesAndSolutions from 'components/CaseStudiesCommon/ChallengesAndSolutions';
import BackgroundImages from 'components/CaseStudiesCommon/BackgroundImages';
import { getBackgroundStyle } from './utils/challengesHelper';
import styles from './styles.module.scss';

const SpecialChallengesAndSolutions = ({ data, type }) => {
  const sectionBackgroundImage = getBackgroundStyle(type, data);
  const { view } = data;

  return (
    <section
      className={cn(styles[type], styles[view])}
      style={sectionBackgroundImage}
    >
      <SectionTitle
        data={data}
        type={type}
      />
      <ChallengesAndSolutions
        data={data}
        type={type}
        view={view}
        isSpecial
      />
      <BackgroundImages
        data={data}
        type={type}
      />
    </section>
  );
};

SpecialChallengesAndSolutions.defaultProps = {
  type: '',
};

SpecialChallengesAndSolutions.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string,
};

export default SpecialChallengesAndSolutions;
