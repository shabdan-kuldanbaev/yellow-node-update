import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import ChallengesAndSolutions from 'UI/components/ChallengesAndSolutions';
import SectionTitle from 'UI/components/SectionTitle';
import Wireframes from 'components/CaseStudiesCommon/Wireframes';
import { useChallengesAndSolutionsWithWireframes } from './utils/useChallengesAndSolutionsWithWireframes';
import styles from './styles.module.scss';

const ChallengesAndSolutionsWithWireframes = (props) => {
  const {
    data,
    type,
    view,
    title,
    subtitle,
    description,
    sectionStyle,
  } = useChallengesAndSolutionsWithWireframes(props);

  return (
    <section
      className={
        cn(
          styles[type],
          styles[view],
          styles.container,
          {
            [styles.challengesWithoutImage]: data.images,
          },
        )
      }
      style={sectionStyle}
    >
      <SectionTitle
        title={title}
        subtitle={subtitle}
        description={description}
        type={type}
      />
      <ChallengesAndSolutions
        data={data}
        type={type}
        view={view}
      />
      <Wireframes
        data={data}
        type={type}
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

export default ChallengesAndSolutionsWithWireframes;
