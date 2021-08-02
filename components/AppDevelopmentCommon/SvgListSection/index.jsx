import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { Animated } from 'components/Common/Animated';
import { Svg } from 'components/AppDevelopmentCommon/Svg';
import { CallToAction } from 'components/Common/CallToAction';
import { SectionTitle } from 'components/CustomChatAppCommon/SectionTitle';
import { ANIMATED_TYPE } from 'utils/constants';
import { getDocumentFields } from 'utils/helper';
import styles from './styles.module.scss';

export const SvgListSection = ({
  sectionData,
  handleOnCTAClick,
  type,
  index,
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
    <div
      className={styles[type]}
      data-index={index}
    >
      <SectionTitle
        title={title}
        description={description}
      />
      <div className={styles.svgList}>
        {technologies.map((technology, technologyIndex) => (
          <Animated
            key={`technologies/${technology}`}
            {...animatedProps}
            transitionDelay={750 + 50 * technologyIndex}
          >
            <Svg type={technology} />
          </Animated>
        ))}
      </div>
      {/* <CallToAction
        type="card"
        title={`Want to start chat app development?
                Ask Yellow’s consultants now.`}
        buttonTitle="Contact us"
        handleOnClick={handleOnCTAClick}
      /> */}
    </div>
  );
};

SvgListSection.propTypes = {
  sectionData: PropTypes.instanceOf(Object).isRequired,
  handleOnCTAClick: PropTypes.func.isRequired,
};
