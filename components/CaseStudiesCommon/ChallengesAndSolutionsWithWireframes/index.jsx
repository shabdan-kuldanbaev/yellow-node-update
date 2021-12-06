import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import get from 'lodash/get';
import ChallengesAndSolutions from 'components/CaseStudiesCommon/ChallengesAndSolutions';
import SectionTitle from 'components/CaseStudiesCommon/SectionTitle';
import Wireframes from 'components/CaseStudiesCommon/Wireframes';
import {
  getFileUrl,
  getOptimizedContentfulImage,
  getDocumentFields,
} from 'utils/helper';
import styles from './styles.module.scss';

const ChallengesAndSolutionsWithWireframes = ({ data, type }) => {
  const sectionBackgroundImage = getOptimizedContentfulImage(
    getFileUrl(get(data, 'background', {})),
    { fm: 'png' },
  );
  const sectionStyle = sectionBackgroundImage ? { backgroundImage: `url(${sectionBackgroundImage})` } : {};
  const { view } = data;

  const { imagesBundles } = getDocumentFields(
    get(data, 'contentModules[0]', {}),
    ['imagesBundles'],
  );

  return (
    <section
      className={cn([styles[type]], [styles[view]], { [styles.challengesWithoutImage]: data.images })}
      style={sectionStyle}
    >
      <SectionTitle
        data={data}
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
