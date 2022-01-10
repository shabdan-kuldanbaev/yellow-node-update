import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import SectionTitle from 'components/CaseStudiesCommon/SectionTitle';
import ChallengesAndSolutions from 'components/CaseStudiesCommon/ChallengesAndSolutions';
import BackgroundImages from 'components/CaseStudiesCommon/BackgroundImages';
import { getBackgroundStyle, checkBackgroundImageDisplaying } from './utils/challengesHelper';
import styles from './styles.module.scss';

const SpecialChallengesAndSolutions = ({ data, type }) => {
  const sectionBackgroundImage = getBackgroundStyle(type, data);
  const displayBackgroundImage = checkBackgroundImageDisplaying(type);

  return (
    <section
      className={cn(styles[type], styles[data.view])}
      style={sectionBackgroundImage}
    >
      <SectionTitle
        data={data}
        type={type}
      />
      <ChallengesAndSolutions
        data={data}
        type={type}
        view={data.view}
        isSpecial
      />
      {displayBackgroundImage && (
        <BackgroundImages
          data={data}
          type={type}
        />
      )}
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
