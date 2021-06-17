import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import ChallengesAndSolutions from 'components/CaseStudiesCommon/ChallengesAndSolutions';
import SectionTitle from 'components/CaseStudiesCommon/SectionTitle';
import Wireframes from 'components/CaseStudiesCommon/Wireframes';
import styles from './styles.module.scss';

const ChallengesAndSolutionsWithWireframes = ({ data, type }) => (
  <section className={cn(
    styles.challenges, {
      [styles[type]]: data.images,
      [styles.challengesWithoutImage]: data.images,
    },
  )}
  >
    <SectionTitle
      data={data}
      type={type}
    />
    <ChallengesAndSolutions data={data} />
    <Wireframes
      data={data}
      type={type}
    />
  </section>
);

ChallengesAndSolutions.defaultProps = {
  type: '',
};

ChallengesAndSolutions.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string,
};

export default ChallengesAndSolutionsWithWireframes;
