import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { Animated } from 'components/Common/Animated';
import { Svg } from 'components/Common/Svg';
import { CallToAction } from 'components/Common/CallToAction';
import { SectionTitle } from 'components/CustomChatAppCommon/SectionTitle';
import { ANIMATED_TYPE } from 'utils/constants';
import { getDocumentFields } from 'utils/helper';
import styles from './styles.module.scss';

export const TechnologiesSection = ({
  sectionData,
  handleOnCTAClick,
}) => {
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
  const { contentList: technologies } = getDocumentFields(
    get(contentModules, '[0]', []),
    ['contentList'],
  );
  const animatedProps = {
    type: ANIMATED_TYPE.isCustom,
    translateY: '2.82352941em',
    opasityDuration: 1,
    transformDuration: 1,
  };

  return (
    <div className={styles.technologiesSection}>
      <SectionTitle
        title={title}
        description={description}
      />
      <div className={styles.technologiesList}>
        {technologies.map((technology, index) => (
          <Animated
            key={`technologies/${technology}`}
            {...animatedProps}
            transitionDelay={750 + 50 * index}
          >
            <Svg type={technology} />
          </Animated>
        ))}
      </div>
      <CallToAction
        type="card"
        title={`Want to start chat app development?
                Ask Yelow’s consultants now.`}
        buttonTitle="Contact us"
        handleOnClick={handleOnCTAClick}
      />
    </div>
  );
};

TechnologiesSection.propTypes = {
  sectionData: PropTypes.instanceOf(Object).isRequired,
};
