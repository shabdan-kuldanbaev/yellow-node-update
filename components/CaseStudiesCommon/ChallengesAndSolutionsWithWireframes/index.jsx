import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import get from 'lodash/get';
import ChallengesAndSolutions from 'components/CaseStudiesCommon/ChallengesAndSolutions';
import SectionTitle from 'components/CaseStudiesCommon/SectionTitle';
import Wireframes from 'components/CaseStudiesCommon/Wireframes';
import { getFileUrl, getOptimizedContentfulImage } from 'utils/helper';
import styles from './styles.module.scss';

const ChallengesAndSolutionsWithWireframes = ({ data, type }) => {
  const backgroundImageUrl = getOptimizedContentfulImage(
    getFileUrl(get(data, 'background', {})),
    { fm: 'png' },
  );
  const style = backgroundImageUrl ? { backgroundImage: `url(${backgroundImageUrl})` } : {};

  return (
    <section
      className={cn([styles[type]], { [styles.challengesWithoutImage]: data.images })}
      style={style}
    >
      <SectionTitle
        data={data}
        type={type}
      />
      <ChallengesAndSolutions
        data={data}
        type={type}
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
