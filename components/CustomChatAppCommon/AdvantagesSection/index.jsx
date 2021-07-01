import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { Animated } from 'components/Common/Animated';
import { Svg } from 'components/Common/Svg';
import { SectionTitle } from 'components/CustomChatAppCommon/SectionTitle';
import { ANIMATED_TYPE, SVG_IMAGES_TYPES } from 'utils/constants';
import { getDocumentFields } from 'utils/helper';
import styles from './styles.module.scss';

export const AdvantagesSection = ({ sectionData }) => {
  const animationProps = {
    type: ANIMATED_TYPE.isCustom,
    translateY: '2.82352941em',
    opasityDuration: 1,
    transformDuration: 1,
  };
  const {
    title,
    description,
    contentModules,
  } = getDocumentFields(
    sectionData,
    [
      'title',
      'description',
      'contentModules',
    ],
  );
  const { contentList: advantages } = getDocumentFields(
    get(contentModules, '[0]', {}),
    ['contentList'],
  );

  if (!advantages || !advantages.length) {
    return null;
  }

  return (
    <div className={styles.advantagesSection}>
      <SectionTitle
        title={title}
        description={description}
      />
      <div className={styles.advantagesList}>
        {advantages.map((advantage, index) => (
          <Animated
            key={`advantages/${advantage}`}
            {...animationProps}
            transitionDelay={600 + 50 * index}
          >
            <div>
              <Svg type={SVG_IMAGES_TYPES.yellowCheckMark} />
            </div>
            <p className={styles.advantageTitle}>
              {advantage}
            </p>
          </Animated>
        ))}
      </div>
    </div>
  );
};

AdvantagesSection.propTypes = {
  sectionData: PropTypes.instanceOf(Array).isRequired,
};
